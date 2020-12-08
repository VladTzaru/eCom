import React from 'react';

interface RatingProps {
  value: number;
  text?: string;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = '#ff7902' }) => {
  return (
    <div className='rating'>
      <span>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <i
            style={{ color }}
            key={i}
            className={
              value >= n
                ? 'fas fa-star'
                : value >= n - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        ))}
      </span>
      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

export default Rating;
