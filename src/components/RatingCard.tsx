import './RatingCard.css';

interface Rating {
  id: string;
  username: string;
  text: string;
  rating: number;
}

interface RatingCardProps {
  rating: Rating;
}

export function RatingCard({ rating }: RatingCardProps) {
  return (
    <div className="rating-card">
      <div className="rating-card-top">
        <div className="rating-card-user">
          <div className="rating-card-avatar">
            <span className="rating-card-avatar-initial">
              {rating.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="rating-card-user-info">
            <h4 className="rating-card-username">{rating.username}</h4>
            <div className="rating-card-stars-row">
              <div className="rating-card-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`rating-card-star${star <= rating.rating ? ' filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-card-rating">
                {rating.rating}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rating-card-divider">
        <p className="rating-card-text">
          &apos;{rating.text}&apos;
        </p>
      </div>
    </div>
  );
}