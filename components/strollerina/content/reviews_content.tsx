'use client';

import { ReviewDTO } from 'types';
import StrollerSection from './review_stroller_content';
import CarSeatSection from './review_carseat_content';

interface ReviewsContentProps {
  reviews: ReviewDTO;
  dictionary: Record<string, any>;
  isSingleColumn: boolean;
}

export default function ReviewsContent({ reviews, dictionary, isSingleColumn }: ReviewsContentProps) {
  return (
    <>
      {/* Combo Reviews Section */}
      {reviews.comboReviews?.length > 0 && (
        <div style={{ width: '100%', marginTop: '40px' }}>
          <h2 className="text-3xl font-semibold text-primary-600 mb-4">{dictionary.reviews['comboReviews']}</h2>
          {reviews.comboReviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-4 sm:gap-8 border border-gray-300 p-4 rounded-lg mt-2 relative"
            >
              {/* Stroller Section */}
              <div className="flex-1">
                <StrollerSection review={review} dictionary={dictionary} isSingleColumn={isSingleColumn} />
              </div>
              {/* Car Seat Section */}
              <div className="flex-1">
                <CarSeatSection review={review} dictionary={dictionary} isSingleColumn={isSingleColumn} />
              </div>

              {/* Reviewer Info */}
              <div className="absolute bottom-2 right-2 text-gray-500 italic text-sm">
                {review.reviewerName} - {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standalone Stroller Reviews Section */}
      {reviews.standaloneStrollerReviews?.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 className="text-3xl font-semibold text-primary-600 mb-4">
            {dictionary.reviews['standaloneStrollerReviews']}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.standaloneStrollerReviews.map((review, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg overflow-hidden relative">
                <StrollerSection review={review} dictionary={dictionary} isSingleColumn={isSingleColumn} />

                {/* Reviewer Info */}
                <div className="absolute bottom-2 right-2 text-gray-500 italic text-sm">
                  {review.reviewerName} - {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standalone Car Seat Reviews Section */}
      {reviews.standaloneCarSeatReviews?.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 className="text-3xl font-semibold text-primary-600 mb-4">
            {dictionary.reviews['standaloneCarSeatReviews']}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.standaloneCarSeatReviews.map((review, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
                <CarSeatSection review={review} dictionary={dictionary} isSingleColumn={isSingleColumn} />

                {/* Reviewer Info */}
                <div className="absolute bottom-2 right-2 text-gray-500 italic text-sm">
                  {review.reviewerName} - {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
