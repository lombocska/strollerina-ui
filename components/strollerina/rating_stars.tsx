"use client"

import { useState } from "react"

export default function RatingStars({ onChange }) {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating); // Notify the parent component
    }
  };

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={`
            text-muted-foreground
            hover:text-primary
            focus:outline-none
            focus-visible:ring-1 focus-visible:ring-ring
            ${star <= rating ? "text-primary" : ""}
          `}
          onClick={() => handleRatingChange(star)}
        >
          <StarIcon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}