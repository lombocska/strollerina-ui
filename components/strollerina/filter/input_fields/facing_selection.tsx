'use client';

import { useEffect, useState } from 'react';
import SelectWithMultipleChip from './select_with_multiple_chip';
import { FacingType } from 'types';
import { getDictionary } from 'get-dictionary';

export default function FacingSelection({ facing, setFilters, isCleared, dictionary} : {
    facing: FacingType[];
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    isCleared: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"];
}) {
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
            label={dictionary["common"]['facing-select-chip']} 
            plHolder={dictionary["common"]['facing-chose']}
            dictionary={dictionary["filters"]["seat"]}
            shouldTranslate={true}/>
    );
}
