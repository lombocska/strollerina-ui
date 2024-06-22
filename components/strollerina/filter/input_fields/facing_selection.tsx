'use client';

import { useEffect, useState } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';

export default function FacingSelection({ facing, setFilters, isCleared}) {

    const [values, setValues] = useState(new Set([]));

    const handleSelectionChange = (items) => {
        setValues(items);
        setFilters((filters) => ({
            ...filters,
            facingMode: Array.from(items)
        }))
      };

    useEffect(() => {
        if (isCleared) {
            console.log("facing filter clearing")
            setValues(new Set([]));
        }
    }, [isCleared]); 

    return (
        <SelectWithMultipleChip 
            items={facing} 
            values={values} 
            handleSelectionChange={handleSelectionChange} 
            label={'facing-select-chip'} 
            plHolder={'facing-chose'}
            shouldTranslate={true}/>
    );
}
