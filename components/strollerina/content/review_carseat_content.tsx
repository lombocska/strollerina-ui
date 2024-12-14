import { Badge, Image } from '@nextui-org/react';
import { ReviewDTO } from 'types';

interface CarSeatSectionProps {
  review: ReviewDTO;
  dictionary: Record<string, any>;
  isSingleColumn: boolean; 
}

export default function CarSeatSection({ review, dictionary, isSingleColumn }: CarSeatSectionProps) {
  return (
    <div
      className={`grid grid-cols-1 ${
        isSingleColumn ? 'sm:grid-cols-1' : 'sm:grid-cols-2'
      } gap-4 sm:gap-8 mb-6 auto-cols-min`}
    >
      {/* First Column: Car Seat Image and Basic Data */}
      <div className="sm:col-span-2 flex flex-col gap-4">
        {/* Car Seat Image */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src={review.carSeatImg || '/default-car-seat-image.jpg'}
            alt={review.carSeatBrand?.name || dictionary.reviews['carSeatAltText']}
            className="w-full sm:w-32 object-cover rounded-lg"
          />
        </div>

        {/* Basic Details */}
        <div className="flex flex-col">
          <p><strong>{dictionary.reviews['carSeatBrand']}:</strong> {review.carSeatBrand || dictionary.reviews['notAvailable']}</p>
          <p><strong>{dictionary.reviews['model']}:</strong> {review.carSeatName || dictionary.reviews['notAvailable']}</p>
          {review.carSeatOriginalPrice > 0 && (
            <p><strong>{dictionary.reviews['originalPrice']}:</strong> ${Math.round(review.carSeatOriginalPrice)}</p>
          )}
          {review.carSeatSellingPrice > 0 && (
            <p><strong>{dictionary.reviews['sellingPrice']}:</strong> ${Math.round(review.carSeatSellingPrice)}</p>
          )}
          <p><strong>{dictionary.reviews['buyDate']}:</strong> {review.carSeatBuyDate || dictionary.reviews['notAvailable']}</p>
          <p><strong>{dictionary.reviews['yearsOfUsage']}:</strong> {review.carSeatYearsOfUsage || 0} {dictionary.reviews['years']}</p>
          <p><strong>{dictionary.reviews['condition']}:</strong> {review.carSeatIsSecondHand ? dictionary.reviews['secondHand'] : dictionary.reviews['new']}</p>
        </div>
      </div>

      {/* Second Column: Ratings */}
      <div className="sm:col-span-1">
        <h3 className="text-xl font-semibold mb-3">{dictionary.reviews['carSeatRatings']}</h3>
        <table className="w-full table-auto">
          <tbody>
            {/* Car Seat Recline */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['recline']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatReclineStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>

            {/* Car Seat Rotation */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['rotation']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatRotationStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>

            {/* Car Seat Air Flow */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['airflow']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatAirFlowStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>

            {/* Car Seat Canopy */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['canopy']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatCanopyStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>

            {/* Car Seat Harness */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['harness']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatHarnessStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>

            {/* Car Seat Cleaning */}
            <tr>
              <td className="px-4 py-2 text-left">{dictionary.reviews['cleaning']}:</td>
              <td className="px-4 py-2">
                <div className="flex gap-1">
                  {[...Array(review.carSeatCleaningStars || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Comment Section Spanning Full Width */}
      <div className="sm:col-span-3 mt-4">
        <p><strong>{dictionary.reviews['comment']}:</strong> {review.carSeatComment || dictionary.reviews['noComments']}</p>
      </div>
    </div>
  );
}
