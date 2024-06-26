'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { StrollerFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";
import { getDictionary } from "get-dictionary";

export default  function StrollerTerrainFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}){
    return (
        <Tags 
            dictionary={dictionary["tags"]}
            tags={siteConfig.stroller_tags} 
            section={"terrain"} 
            lsName={"stroller/selectedTerrainTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
