'use client';

import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';

export default function BrandSelection({ brands, setFilters, isCleared}) {
    const { t } = useTranslation('strollers');

    // const [values, setValues] = useLocalStorage("stroller/selectedBrandsName", new Set([]));
    const [values, setValues] = useState(new Set([]));

    const handleSelectionChange = (items) => {
        // setSelectedBrands(Array.from(items).join(","));
        setValues(items);
        setFilters((filters) => ({
            ...filters,
            brandsName: Array.from(items)
        }))
      };

    useEffect(() => {
        if (isCleared) {
            console.log("brands filter clearing")
            setValues(new Set([]));
        }
    }, [isCleared]); 

    return (
        <SelectWithMultipleChip 
            items={brands} 
            values={values} 
            handleSelectionChange={handleSelectionChange} 
            label={'brand-select-chip'} 
            plHolder={'brand-chose'}
            shouldTranslate={false}/>
    );
}
