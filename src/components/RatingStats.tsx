interface RatingStatsProps {
  average: number;
  count: number;
}

export function RatingStats({ average, count }: RatingStatsProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl ${
                star <= Math.round(average)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-600 ml-2">
          ({count} avaliação{count !== 1 ? 's' : ''})
        </span>
      </div>
    </div>
  );
}