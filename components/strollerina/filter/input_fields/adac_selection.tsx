'use client';

import { useEffect, useState } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';
import { AdacSelectionProps, AdacType, CarSeatFilters } from 'types';

export default function AdacSelection({ adacs, setFilters, isCleared} : AdacSelectionProps) {

    // const [values, setValues] = useState(new Set([]));
    const [values, setValues] = useState<Set<AdacType>>(new Set());

    const handleSelectionChange = (items : Set<AdacType>) => {
        setValues(items);
        if (setFilters) {
            setFilters((filters : CarSeatFilters) => ({
                ...filters,
                adacsName: Array.from(items)
            }))
        }
      };

    useEffect(() => {
        if (isCleared) {
            console.log("adac filter clearing")
            setValues(new Set([]));
        }
    }, [isCleared]); 

    return (
        <SelectWithMultipleChip 
            items={adacs} 
            values={values} 
            handleSelectionChange={handleSelectionChange} 
            label={'adac-select-chip'} 
            plHolder={'adac-chose'}
            shouldTranslate={true}/>
    );
}
