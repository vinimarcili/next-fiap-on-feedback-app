import './RatingStats.css';

interface RatingStatsProps {
  average: number;
  count: number;
}

export function RatingStats({ average, count }: RatingStatsProps) {
  return (
    <div className="rating-stats">
      <div className="rating-stats-group">
        <div className="rating-stats-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`rating-stats-star ${star <= Math.round(average) ? 'filled' : 'empty'}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-stats-count">
          ({count} avaliação{count !== 1 ? 's' : ''})
        </span>
      </div>
    </div>
  );
}