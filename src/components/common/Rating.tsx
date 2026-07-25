import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  interactive = false,
  onRate,
  size = 'md',
  showNumber = true
}) => {
  const [hoverRating, setHoverRating] = React.useState<number>(0);

  const starSizeClass = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];

  const currentVal = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(currentVal);
          const isHalf = !isFilled && star - 0.5 <= currentVal;

          return (
            <button
              key={star}
              type={interactive ? 'button' : undefined}
              disabled={!interactive}
              onClick={() => interactive && onRate?.(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${interactive ? 'cursor-pointer transform hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
            >
              <Star
                className={`${starSizeClass} ${
                  isFilled || isHalf ? 'fill-[#CCA37E] text-[#CCA37E]' : 'text-[#8D9399]/40'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {(showNumber || reviewCount !== undefined) && (
        <div className={`flex items-center gap-1 font-sans ${textSizeClass} text-[#1E1A17]/80`}>
          {showNumber && <span className="font-medium text-[#1E1A17]">{rating.toFixed(1)}</span>}
          {reviewCount !== undefined && (
            <span className="text-[#8D9399]">({reviewCount})</span>
          )}
        </div>
      )}
    </div>
  );
};
