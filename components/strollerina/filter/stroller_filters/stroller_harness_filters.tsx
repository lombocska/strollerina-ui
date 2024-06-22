'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { StrollerFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";

export default  function StrollerHarnessFilters({setFilters, isCleared}: StrollerFiltersProps){
    
    return (
        <Tags 
            tags={siteConfig.stroller_tags} 
            section={"harness"} 
            lsName={"stroller/selectedHarnessTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
