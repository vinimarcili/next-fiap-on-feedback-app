import { Rating } from "@/interfaces/rating.interface";
import './RatingCard.css';

interface RatingCardProps {
  rating: Rating;
}

export function RatingCard({ rating }: RatingCardProps) {
  return (
    <div className="rating-card">
      <div className="rating-header">
        <div className="rating-user">
          <div className="rating-avatar">
            <span>{rating.username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="rating-info">
            <h4 className="rating-username">{rating.username}</h4>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating.rating ? 'filled' : 'empty'}`}
                >
                  ★
                </span>
              ))}
              <span className="rating-value">
                {rating.rating}/5
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="rating-divider">
        <p className="rating-text">{rating.text}</p>
      </div>
    </div>
  );
}