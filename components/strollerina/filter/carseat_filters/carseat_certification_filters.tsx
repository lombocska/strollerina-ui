'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";
import { getDictionary } from "get-dictionary";

export default  function CarSeatCertificationFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){

    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"certification"} 
                lsName={"carseat/selectedCertificationTags"}
                isCleared={isCleared ?? false}
                dictionary={dictionary["tags"]}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
       

        </>        
    );
}
