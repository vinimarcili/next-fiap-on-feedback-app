'use client';

import { useEffect, useState, useCallback, useMemo } from 'react'
import { RatingCard } from './RatingCard';
import { Rating } from '@/interfaces/rating.interface';
import './ProductRatings.css';
import './ProductRatingsLoader.css';

interface ProductRatingsProps {
  productId: string;
}

export function ProductRatings({ productId }: ProductRatingsProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  // TODO: default true
  const [loading, setLoading] = useState(false);
  // TODO: implementar
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchRatings = useCallback(() => {
    // TODO: implementar
  }, [productId]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const averageRating = useMemo(
    () => (ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0), [ratings]
  );

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
    </div>
  );
}