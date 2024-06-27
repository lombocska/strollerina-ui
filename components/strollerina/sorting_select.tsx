'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { siteConfig } from 'config/site';
import { getDictionary } from 'get-dictionary';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { StrollerCard, StrollersContentProps } from 'types';
// import { Select, SelectItem } from 'your-select-component-library'; // Adjust the import according to your select component library
// import siteConfig from 'your-site-config-path'; // Adjust the import according to your site config path

export default function SortingSelect({strollers, setStrollers, dictionary}: {
    strollers: StrollersContentProps; 
    setStrollers: React.Dispatch<React.SetStateAction<StrollerCard[]>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}) {
    const [value, setValue] = useState(2);
    const sortings = siteConfig.stroller_sortings;
    const { theme } = useTheme(); // Access the current theme using next-themes hook

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(Number(e.target.value));
    };

    function sort() {
        const sortDirection = value;
        const copyArray = [...strollers]; // create a new array & not mutate state
        console.log("Sort direction changed to: " + sortDirection);

        //alphabet
        if (sortDirection === 2) {
            //abc desc
            console.log("abc sort");
            copyArray.sort((a, b) => a.brand.localeCompare(b.brand));
        } else if (sortDirection === 0 || sortDirection === 1) {
            //price desc
            console.log("price sort");
            copyArray.sort((a, b) => {
                return sortDirection === 0 ? (a.priceFrom === 0) - (b.priceFrom === 0) || a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom;
            });
        } else if (sortDirection === 3 || sortDirection === 4) {
            console.log("weight sort");
            //weight desc
            copyArray.sort((a, b) => {
                return sortDirection === 3 ? (a.weight === 0) - (b.weight === 0) || a.weight - b.weight : b.weight - a.weight;
            });
        } else if (sortDirection === 5 || sortDirection === 6) {
            console.log("height sort");
            //height desc
            copyArray.sort((a, b) => {
                return sortDirection === 5 ? (a.openHeight === 0) - (b.openHeight === 0) || a.openHeight - b.openHeight : b.openHeight - a.openHeight;
            });
        }
        setStrollers(copyArray); //re-render
    }

    useEffect(() => {
        sort();
    }, [value]); 

    return (
        <div className="flex-shrink-0 w-full max-w-md ">
            <Select
                radius="full"
                items={sortings}
                placeholder={dictionary["common"]["sort-label"]}
                className="max-w-lg"
                onChange={handleSelectionChange}
                variant={"bordered"}
            >
                {sortings.map(sorting => (
                    <SelectItem key={sorting.value} textValue={dictionary["sorting"][sorting.name]} className={`${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
                        {dictionary["sorting"][sorting.name]}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
    

export function CarSeatSortingSelect({carseats, setCarseats, dictionary} : {
    carseats:  CarseatsContentProps;
    setCarseats:React.Dispatch<React.SetStateAction<CarseatCardDTO[]>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}) {

    const [value, setValue] = React.useState(1);
    // const { t } = useTranslation('common');
    const sortings = siteConfig.carseat_sortings;
    const { theme } = useTheme(); // Access the current theme using next-themes hook

    const handleSelectionChange = (e) => {
        setValue(e.target.value);
      };

    function sort() {
        const sortDirection = value;

        // const sortDirection = e.target.value;
        const copyArray = [...carseats]; // create a new array & not mutate state
        console.log("Sort direction changed to: " + sortDirection)

        //alphabet
        //alphabet
        if (sortDirection == 0) {
            copyArray.sort((a, b) => a.brand.localeCompare(b.brand));
        } else if (sortDirection == 1 || sortDirection == 2) {
            //asc desc
            copyArray.sort((a, b) => {
                return sortDirection == 1 ? (a.bestAdac==null)-(b.bestAdac==null) || a.bestAdac - b.bestAdac : b.bestAdac - a.bestAdac;
            });
        }
        setCarseats(copyArray); //re-render
    
    };
    

    useEffect(() => {
        sort();
    }, [value]); 


    return (
        <div className="flex-shrink-0 w-full max-w-md">

        <Select
            radius="full"
            items={sortings}
            placeholder={dictionary["common"]["sort-label"]}
            className="max-w-lg "
            onChange={handleSelectionChange}
            variant={"bordered"}
            >
             {sortings.map(sorting => (
                    <SelectItem key={sorting.value} textValue={dictionary["sorting"][sorting.name]} className={`${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
                        {dictionary["sorting"][sorting.name]}
                    </SelectItem>
            ))}
         </Select>
         </div>
    );
}

