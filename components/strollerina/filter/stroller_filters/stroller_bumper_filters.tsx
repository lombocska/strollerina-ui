'use client';

import { siteConfig } from "config/site";
import { Dispatch, SetStateAction } from "react";
import { StrollerFiltersProps } from "types";
import Tags from "../input_fields/tags";
import { getDictionary } from "get-dictionary";

export default  function StrollerBumperFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}){
    
    return (
        <Tags 
            dictionary={dictionary["tags"]}
            tags={siteConfig.stroller_tags} 
            section={"bumper"} 
            lsName={"stroller/selectedBumperTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
