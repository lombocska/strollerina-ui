'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { Dispatch, SetStateAction } from "react";
import { getDictionary } from "get-dictionary";

export default  function StrollerHarnessFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}){
    return (
        <Tags 
            tags={siteConfig.stroller_tags} 
            section={"harness"} 
            lsName={"stroller/tags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>}
            dictionary={dictionary["tags"]} />
    );
}
