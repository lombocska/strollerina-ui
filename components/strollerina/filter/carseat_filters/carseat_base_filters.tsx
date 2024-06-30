'use client';

import { siteConfig } from "config/site";
import { getDictionary } from "get-dictionary";
import { Dispatch, SetStateAction } from "react";
import Tags from "../input_fields/tags";

export default  function CarSeatBaseFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
    return (
        <>
            <Tags 
                dictionary={dictionary["tags"]}
                tags={siteConfig.carseat_tags} 
                section={"base"} 
                lsName={"carseat/tags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
        </>        
    );
}
