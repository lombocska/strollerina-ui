'use client';

import { siteConfig } from "@/config/site";
import Tags from "../input_fields/tags";
import { CarSeatFiltersProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

export default  function CarSeatBaseFilters({setFilters, isCleared}: CarSeatFiltersProps) {

    return (
        <>
            <Tags 
                tags={siteConfig.carseat_tags} 
                section={"base"} 
                lsName={"carseat/selectedBaseTags"}
                isCleared={isCleared ?? false}
                setFilters={setFilters as Dispatch<SetStateAction<any>>} />
        </>        
    );
}
