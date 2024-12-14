'use client';

import { useState, useEffect } from 'react';
import { ReviewDTO } from 'types';
import { Chip } from '@nextui-org/react'; // Assuming you're using NextUI's Chip component
import { getCarSeatBrands, getFilteredReviews, getStrollerBrands } from 'lib/data';
import ReviewsContent from './reviews_content';

interface ReviewsContentProps {
  initialData: ReviewDTO;
  dictionary: Record<string, any>;
}

export default function ReviewsContentWithFilter({ initialData, dictionary }: ReviewsContentProps) {
  const [filters, setFilters] = useState({
    strollerBrands: [] as string[],
    carSeatBrands: [] as string[],
  });
  
  const [strollerBrands, setStrollerBrands] = useState<any[]>([]);
  const [carSeatBrands, setCarSeatBrands] = useState<any[]>([]);
  const [reviews, setReviews] = useState(initialData);  

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const strollerData = await getStrollerBrands();
        const carSeatData = await getCarSeatBrands();
        setStrollerBrands(strollerData);
        setCarSeatBrands(carSeatData);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Function to toggle stroller brand filter
  const toggleStrollerBrandFilter = (brand: string) => {
    setFilters((prev) => {
      const updatedStrollerBrands = prev.strollerBrands.includes(brand)
        ? prev.strollerBrands.filter((item) => item !== brand)
        : [...prev.strollerBrands, brand];
      return { ...prev, strollerBrands: updatedStrollerBrands };
    });
  };

  // Function to toggle car seat brand filter
  const toggleCarSeatBrandFilter = (brand: string) => {
    setFilters((prev) => {
      const updatedCarSeatBrands = prev.carSeatBrands.includes(brand)
        ? prev.carSeatBrands.filter((item) => item !== brand)
        : [...prev.carSeatBrands, brand];
      return { ...prev, carSeatBrands: updatedCarSeatBrands };
    });
  };


  // Function to fetch filtered reviews from the backend
  const fetchFilteredReviews = async () => {
    const strollerBrandsQuery = filters.strollerBrands.join(',');
    const carSeatBrandsQuery = filters.carSeatBrands.join(',');

    try {
      const filteredReviews = getFilteredReviews(strollerBrandsQuery, carSeatBrandsQuery)
      setReviews(await filteredReviews);
    } catch (error) {
      console.error('Error fetching filtered reviews:', error);
    }
  };

  // Fetch filtered reviews whenever filters change
  useEffect(() => {
    fetchFilteredReviews(); // Trigger fetch when filters change
  }, [filters]);


  return (
    <>
      {/* Filter Section */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          {/* Instruction Text */}
        <div style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
          <p>{dictionary.reviews['filterInstructions'] || 'Filter other family reviews on strollers and car seats'}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Stroller Brand Filters (Chips) */}
          <div>
            <h3>{dictionary.reviews['allStrollerBrands']}</h3>
            {strollerBrands.map((brand) => (
              <Chip
                className='m-1'
                key={brand.value}
                clickable
                bordered
                color={filters.strollerBrands.includes(brand.value) ? 'primary' : 'default'}
                onClick={() => toggleStrollerBrandFilter(brand.value)}
              >
                {brand.name}
              </Chip>
            ))}
          </div>

          {/* Car Seat Brand Filters (Chips) */}
          <div>
            <h3>{dictionary.reviews['allCarSeatBrands']}</h3>
            {carSeatBrands.map((brand) => (
              <Chip
                className='m-1'
                key={brand.value}
                clickable
                bordered
                color={filters.carSeatBrands.includes(brand.value) ? 'primary' : 'default'}
                onClick={() => toggleCarSeatBrandFilter(brand.value)}
              >
                {brand.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      

      <ReviewsContent dictionary={dictionary} reviews={reviews}  isSingleColumn={false}/>
    </>
  );
}

const styles = {
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    width: '100%',
  },
};
