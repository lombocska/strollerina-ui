'use client';

import { siteConfig } from "config/site";
import { Dispatch, SetStateAction } from "react";
import { StrollerFiltersProps } from "types";
import Tags from "../input_fields/tags";

export default  function StrollerBumperFilters({setFilters, isCleared}: StrollerFiltersProps){
    
    return (
        <Tags 
            tags={siteConfig.stroller_tags} 
            section={"bumper"} 
            lsName={"stroller/selectedBumperTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
