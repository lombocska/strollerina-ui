import { Badge, Image } from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';
import { ReviewDTO } from 'types';

interface StrollerSectionProps {
  review: ReviewDTO;
  dictionary: Record<string, any>;
  isSingleColumn: boolean; 
}

export default function StrollerSection({ review, dictionary, isSingleColumn }: StrollerSectionProps) {
  return (
    <div
      className={`grid grid-cols-1 ${
        isSingleColumn ? 'sm:grid-cols-1' : 'sm:grid-cols-2'
      } gap-4 sm:gap-8 mb-6 auto-cols-min`}
    >
      {/* First Column: Stroller Image and Basic Data */}
      <div className="flex flex-col gap-4">
        {/* Stroller Image */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src={review.strollerImg || '/default-stroller-image.jpg'}
            alt={review.strollerBrand?.name || dictionary.reviews['strollerAltText']}
            className="w-full sm:w-32 object-cover rounded-lg"
          />
        </div>

        {/* Basic Details */}
        <div className="flex flex-col">
          <p><strong>{dictionary.reviews['strollerBrand']}:</strong> {review.strollerBrand || dictionary.reviews['notAvailable']}</p>
          <p><strong>{dictionary.reviews['model']}:</strong> {review.strollerName || dictionary.reviews['notAvailable']}</p>
          {review.strollerOriginalPrice > 0 && (
            <p>
              <strong>{dictionary.reviews['originalPrice']}:</strong> ${Math.round(review.strollerOriginalPrice)}
            </p>
          )}
          {review.strollerSellingPrice > 0 && (
            <p>
              <strong>{dictionary.reviews['sellingPrice']}:</strong> ${Math.round(review.strollerSellingPrice)}
            </p>
          )}

          <p><strong>{dictionary.reviews['buyDate']}:</strong> {review.strollerBuyDate || dictionary.reviews['notAvailable']}</p>
          <p><strong>{dictionary.reviews['yearsOfUsage']}:</strong> {review.strollerYearsOfUsage || 0} {dictionary.reviews['years']}</p>
          <p><strong>{dictionary.reviews['condition']}:</strong> {review.strollerIsSecondHand ? dictionary.reviews['secondHand'] : dictionary.reviews['new']}</p>
        </div>
      </div>

      {/* Second Column: Ratings */}
      <div className="sm:col-span-1">
        <h3 className="text-xl font-semibold mb-3">{dictionary.reviews['strollerRatings']}</h3>
        <table className="w-full table-auto">
          <tbody>
            {/* Ratings */}
            {[
              ['fold', review.strollerFoldStars],
              ['recline', review.strollerReclineStars],
              ['handlebar', review.strollerHandlebarStars],
              ['canopy', review.strollerCanopyStars],
              ['harness', review.strollerHarnessStars],
              ['carrycot', review.strollerCarrycotStars],
              ['basket', review.strollerBasketStars],
              ['seat', review.strollerSeatStars],
              ['cleaning', review.strollerCleaningStars],
            ].map(([label, stars], index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-left">{dictionary.reviews[label]}:</td>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    {[...Array(stars || 0)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment Section Spanning Full Width */}
      <div className="sm:col-span-3 mt-4">
        <p><strong>{dictionary.reviews['comment']}:</strong> {review.strollerComment || dictionary.reviews['noComments']}</p>
      </div>
    </div>
  );
}
