'use client';

import { siteConfig } from "config/site";
import { Select, SelectItem } from "@nextui-org/select";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";

export default function SortingSelect({strollers, setStrollers}) {

    const [value, setValue] = React.useState(2);
    const { t } = useTranslation('common');
    const sortings = siteConfig.stroller_sortings;

    const handleSelectionChange = (e) => {
        setValue(e.target.value);
      };

    function sort() {
        const sortDirection = value;

        // const sortDirection = e.target.value;
        const copyArray = [...strollers]; // create a new array & not mutate state
        console.log("Sort direction changed to: " + sortDirection)

        //alphabet
        if (sortDirection == 2) {
            //abc desc
            console.log("abc sort")
            copyArray.sort((a, b) => a.brand.localeCompare(b.brand));
        } else if (sortDirection == 0 || sortDirection == 1) {
            //price desc
            console.log("price sort")
            copyArray.sort((a, b) => {
                return sortDirection == 0 ? (a.priceFrom===0)-(b.priceFrom===0) || a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom;
            });
        } else if (sortDirection == 3 || sortDirection == 4) {
            console.log("weight sort")
            //weight desc
            copyArray.sort((a, b) => {
                return sortDirection == 3 ? (a.weight===0)-(b.weight===0) || a.weight - b.weight : b.weight - a.weight;
            });
        } else if (sortDirection == 5 || sortDirection == 6) {
            console.log("height sort")
            //height desc
            copyArray.sort((a, b) => {
                return sortDirection == 5 ? (a.openHeight===0)-(b.openHeight===0) || a.openHeight - b.openHeight : b.openHeight - a.openHeight;
            });
        }
        setStrollers(copyArray); //re-render
    };
    

    useEffect(() => {
        sort();
    }, [value]); 

    return (
        <Select
            radius="full"
            items={sortings}
            // selectedKeys={value}
            // label={t('sort-label')}
            // labelPlacement="outside"
            placeholder={t('sort-label')}
            className="max-w-lg "
            onChange={handleSelectionChange}
            variant={"bordered"}
            >
             {(sorting) => <SelectItem key={sorting.value} textValue={t("strollers:"+ sorting.name)}> {t("strollers:"+ sorting.name)}</SelectItem>}
         </Select>
    );
}
    

export function CarSeatSortingSelect({carseats, setCarseats}) {

    const [value, setValue] = React.useState(1);
    const { t } = useTranslation('common');
    const sortings = siteConfig.carseat_sortings;

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
        <Select
            radius="full"
            items={sortings}
            // selectedKeys={value}
            // label={t('sort-label')}
            // labelPlacement="outside"
            placeholder={t('sort-label')}
            className="max-w-lg "
            onChange={handleSelectionChange}
            variant={"bordered"}
            >
             {(sorting) => <SelectItem key={sorting.value} textValue={t("carseats:"+ sorting.name)}> {t("carseats:"+ sorting.name)}</SelectItem>}
         </Select>
    );
}

