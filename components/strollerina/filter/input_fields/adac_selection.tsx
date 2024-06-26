'use client';

import { getDictionary } from 'get-dictionary';
import { useEffect, useState } from 'react';
import { AdacType, CarSeatFilters } from 'types';
import SelectWithMultipleChip from './select_with_multiple_chip';

export default function AdacSelection({ adacs, setFilters, isCleared, dictionary} : {
    adacs: AdacType[];
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    isCleared: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"];
}) {

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
            label={dictionary["common"]['adac-select-chip']} 
            plHolder={dictionary["common"]['adac-chose']}
            dictionary={dictionary["filters"]["adac"]}
            shouldTranslate={true}/>
    );
}
