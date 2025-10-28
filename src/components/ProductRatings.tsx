'use client';

import { useEffect, useState, useCallback } from 'react';
import { RatingCard } from './RatingCard';
import { AddRatingDialog } from './AddRatingDialog';
import './ProductRatings.css';
import './ProductRatingsLoader.css';
import './ProductRatingsError.css';

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
      <div className="ratings-loader">
        <div className="ratings-loader-spinner">
          <div className="ratings-loader-spin"></div>
          <div className="ratings-loader-spin-reverse"></div>
        </div>
        <span className="ratings-loader-text">Carregando avaliações...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ratings-error">
        <div className="ratings-error-icon">
          <span>⚠️</span>
        </div>
        <h3 className="ratings-error-title">Erro ao carregar avaliações</h3>
        <p className="ratings-error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="ratings-section">
      {ratings.length > 0 && (
        <div className="ratings-summary">
          <div className="ratings-header">
            <h3 className="ratings-title">Avaliações dos Clientes</h3>
            <div className="ratings-actions">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="ratings-btn"
              >
                <span style={{ fontSize: '1.25rem' }}>✏️</span>
                <span>Avaliar Produto</span>
              </button>
              <div className="ratings-average">
                <span className="star">⭐</span>
                <span className="value">{averageRating.toFixed(1)}</span>
                <span className="count">({ratings.length})</span>
              </div>
            </div>
          </div>
          <div className="ratings-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= Math.round(averageRating) ? 'filled' : 'empty'}`}
              >
                ★
              </span>
            ))}
            <span className="ratings-base">
              Baseado em {ratings.length} avaliação{ratings.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
      <div className="ratings-list">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} />
          ))
        ) : (
          <div className="ratings-empty">
            <div className="ratings-empty-icon">
              <span>💭</span>
            </div>
            <h3 className="ratings-empty-title">Seja o primeiro a avaliar!</h3>
            <p className="ratings-empty-text">Sua opinião é muito importante para outros compradores.</p>
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