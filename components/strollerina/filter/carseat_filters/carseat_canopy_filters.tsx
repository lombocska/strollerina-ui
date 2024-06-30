'use client';

import { siteConfig } from "config/site";
import { getDictionary } from "get-dictionary";
import { Dispatch, SetStateAction } from "react";
import Tags from "../input_fields/tags";

export default  function CarSeatCanopyFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["carseats"]
}){
    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"canopy"} 
                lsName={"carseat/tags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} 
                dictionary={dictionary["tags"]}/>


        </>        
    );
}
