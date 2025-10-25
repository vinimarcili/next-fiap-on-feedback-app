import { Rating } from "@/interfaces/rating.interface";

interface RatingCardProps {
  rating: Rating;
}

export function RatingCard({ rating }: RatingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-blue-600 font-bold text-lg">
              {rating.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{rating.username}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= rating.rating
                        ? 'text-yellow-400 drop-shadow-sm'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {rating.rating}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-gray-700 leading-relaxed text-base">
          &apos;{rating.text}&apos;
        </p>
      </div>
    </div>
  );
}