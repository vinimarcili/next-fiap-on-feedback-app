'use client';

import { useEffect, useState, useCallback } from 'react';
import { RatingCard } from './RatingCard';
import { AddRatingDialog } from './AddRatingDialog';

interface Rating {
  id: string;
  username: string;
  text: string;
  rating: number;
}

interface ProductRatingsProps {
  productId: string;
}

export function ProductRatings({ productId }: ProductRatingsProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchRatings = useCallback(() => {
    fetch(`/api/products/${productId}/ratings`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar avaliações');
        }
        return res.json();
      })
      .then(data => {
        setRatings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
        setError('Erro ao carregar avaliações');
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const handleRatingAdded = () => {
    fetchRatings();
  };

  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <span className="ml-4 text-gray-600 font-medium">Carregando avaliações...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar avaliações</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {ratings.length > 0 && (
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-0">
            <h3 className="text-xl font-bold text-gray-900 mb-0">Avaliações dos Clientes</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer bg-blue-600 text-white p-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg group-hover:shadow-xl"
              >
                <span className="text-lg">✏️</span>
                <span>Avaliar Produto</span>
              </button>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                <span className="text-gray-600">({ratings.length})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 drop-shadow-sm'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              Baseado em {ratings.length} avaliação{ratings.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} />
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seja o primeiro a avaliar!</h3>
            <p className="text-gray-600">Sua opinião é muito importante para outros compradores.</p>
          </div>
        )}
      </div>

      <AddRatingDialog
        productId={productId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onRatingAdded={handleRatingAdded}
      />
    </div>
  );
}