'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { StrollerFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";

export default  function StrollerSeatFilters({setFilters, isCleared}: StrollerFiltersProps){
    

    return (
        <Tags 
            tags={siteConfig.stroller_tags} 
            section={"seat"} 
            lsName={"stroller/selectedSeatTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
