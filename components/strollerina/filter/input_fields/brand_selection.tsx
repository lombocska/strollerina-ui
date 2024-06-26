'use client';

import { useEffect, useState } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';

export default function BrandSelection({ brands, setFilters, isCleared, dictionary}) {

    const [values, setValues] = useState(new Set([]));

    const handleSelectionChange = (items) => {
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
            label={dictionary["common"]['brand-select-chip']} 
            plHolder={dictionary["common"]['brand-chose']}
            shouldTranslate={false}
            dictionary={dictionary}
            />
    );
}
