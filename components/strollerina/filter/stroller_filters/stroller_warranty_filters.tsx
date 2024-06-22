'use client';

import { siteConfig } from "config/site";
import Tags from "../input_fields/tags";
import { StrollerFiltersProps } from "types";
import { Dispatch, SetStateAction } from "react";

export default  function StrollerWarrantyFilters({setFilters, isCleared}: StrollerFiltersProps){
 
    return (
        <Tags 
            tags={siteConfig.stroller_tags} 
            section={"warranty"} 
            lsName={"stroller/selectedWarrantyTags"}
            isCleared={isCleared ?? false}
            setFilters={setFilters as Dispatch<SetStateAction<any>>} />
   
    );
}
