'use client';

import { useEffect } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';
import { useLocalStorage } from 'lib/LocalStorageAPI';

export default function BrandSelection({ brands, setFilters, isCleared, dictionary, type }) {
  const [selectedStrollerValues, setSelectedStrollerValues] = useLocalStorage("stroller/selectedBrandsName", new Set());
  const [selectedCarseatValues, setSelectedCarseatValues] = useLocalStorage("carseat/selectedBrandsName", new Set());

  const handleSelectionChange = (items) => {
    const itemsSet = new Set(items);
    if (type === "strollers") {
      setSelectedStrollerValues(itemsSet);
    } else {
      setSelectedCarseatValues(itemsSet);
    }
    setFilters((filters) => ({
      ...filters,
      brandsName: Array.from(itemsSet)
    }));
  };

  useEffect(() => {
    if (isCleared) {
      if (type === "strollers") {
        setSelectedStrollerValues(new Set());
      } else {
        setSelectedCarseatValues(new Set());
      }
    }
  }, [isCleared]);

  return (
    <SelectWithMultipleChip 
      items={brands} 
      values={type === "strollers" ? selectedStrollerValues : selectedCarseatValues} 
      handleSelectionChange={handleSelectionChange} 
      label={dictionary["common"]['brand-select-chip']} 
      plHolder={dictionary["common"]['brand-chose']}
      shouldTranslate={false}
      dictionary={dictionary}
    />
  );
}
