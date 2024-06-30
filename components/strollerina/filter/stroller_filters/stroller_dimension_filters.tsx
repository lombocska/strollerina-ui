'use client';

import { siteConfig } from "config/site";
import  {useLocalStorage}  from 'lib/LocalStorageAPI';
import { FIFTY, ONE, ONE_HUNDRED, ONE_HUNDRED_FIFTY, ONE_HUNDRED_THIRTY, SIXSTY, TEN, THIRTY, TWO_HUNDRED, ZERO } from "lib/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { BackWheel, FrontWheel, SeatHeight, StrollerHeight, StrollerLength, StrollerWidth, Weight } from "../../icons";
import NumberInput from "../input_fields/number_input";
import Tags from "../input_fields/tags";
import { StrollerFilters, StrollerFiltersProps } from "types";
import { getDictionary } from "get-dictionary";

export default function StrollerDimensionFilters({setFilters, isCleared, dictionary} : {
    isCleared: boolean | false;
    setFilters: React.Dispatch<React.SetStateAction<any>>; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]
}){
    
    const [selectedMaxHeight, setSelectedMaxHeight] = useLocalStorage("stroller/selectedMaxHeight", TWO_HUNDRED);
    const [selectedClosedMaxHeight, setSelectedClosedMaxHeight] = useLocalStorage("stroller/selectedClosedMaxHeight", TWO_HUNDRED);
    const [selectedMaxWidth, setSelectedMaxWidth] = useLocalStorage("stroller/selectedMaxWidth", ONE_HUNDRED_THIRTY);
    const [selectedMaxLength, setSelectedMaxLength] = useLocalStorage("stroller/selectedMaxLength", TWO_HUNDRED);
    const [selectedClosedMaxLength, setSelectedClosedMaxLength] = useLocalStorage("stroller/selectedClosedMaxLength", ONE_HUNDRED_FIFTY);
    const [selectedMaxWeight, setSelectedMaxWeight] = useLocalStorage("stroller/selectedMaxWeight", THIRTY);
    const [selectedMinSeatHeight, setSelectedMinSeatHeight] = useLocalStorage("stroller/selectedMinSeatHeight", ZERO);
    const [selectedMinFrontWheelSize, setSelectedMinFrontWheelSize] = useLocalStorage("stroller/selectedMinFrontWheelSize", ZERO);
    const [selectedMinBackWheelSize, setSelectedMinBackWheelSize] = useLocalStorage("stroller/selectedMinBackWheelSize", ZERO);
    
    const [selectedSiblingMode, setSelectedSiblingMode] = useLocalStorage("stroller/selectedSiblingMode", false);
    const [selectedReversibleSeatMode, setSelectedReversibleSeatMode] = useLocalStorage("stroller/selectedReversibleSeatMode", false);
    const [selectedFullRecliningSeatMode, setSelectedFullRecliningSeatMode] = useLocalStorage("stroller/selectedFullRecliningSeatMode", false);


    useEffect(() => {
        console.log("stroller filters changing")
        if (setFilters) { // Ensure setFilters is defined
            setFilters((filters : StrollerFilters) => {
                return {
                    ...filters,
                    maxHeight: selectedMaxHeight,
                    closedMaxHeight: selectedClosedMaxHeight,
                    maxWidth: selectedMaxWidth,
                    maxLength: selectedMaxLength,
                    closedMaxLength: selectedClosedMaxLength,
                    maxWeight: selectedMaxWeight,
                    minSeatHeight: selectedMinSeatHeight,
                    minFrontWheelSize: selectedMinFrontWheelSize,
                    minBackWheelSize: selectedMinBackWheelSize,
                    siblingMode: selectedSiblingMode,
                    reversibleSeatMode: selectedReversibleSeatMode,
                    fullRecliningSeatMode : selectedFullRecliningSeatMode,
                };
            });
        }

        }, [selectedMaxHeight, selectedClosedMaxHeight, selectedMaxWidth, selectedMaxLength, 
            selectedClosedMaxLength, selectedMaxWeight, selectedMinSeatHeight, 
            selectedMinFrontWheelSize, selectedMinBackWheelSize,
            selectedSiblingMode, selectedReversibleSeatMode, selectedFullRecliningSeatMode,
    ]); 
    
    useEffect(() => {
        if (isCleared) {
            console.log("dimensions filter clearing")
            setSelectedMaxHeight(TWO_HUNDRED);
            setSelectedClosedMaxHeight(TWO_HUNDRED);
            setSelectedMaxWidth(ONE_HUNDRED_THIRTY);
            setSelectedMaxLength(TWO_HUNDRED);
            setSelectedClosedMaxLength(ONE_HUNDRED_FIFTY);
            setSelectedMaxWeight(THIRTY);
            setSelectedMinSeatHeight(ZERO);
            setSelectedMinFrontWheelSize(ZERO);
            setSelectedMinBackWheelSize(ZERO);
            
            setSelectedSiblingMode(false);
            setSelectedReversibleSeatMode(false);
            setSelectedFullRecliningSeatMode(false);

        }
    }, [isCleared]); 

    return (
        <>
                    <Tags 
                        tags={siteConfig.stroller_tags} 
                        section={"dimension"} 
                        lsName={"stroller/tags"}
                        isCleared={isCleared ?? false}
                        setFilters={setFilters as Dispatch<SetStateAction<any>>}
                        dictionary={dictionary["tags"]}
                         />
               

                    <NumberInput 
                        title={"max-weight"} 
                        label={dictionary["filters"]['max-weight']}
                        inputValue={selectedMaxWeight} 
                        setInputValue={setSelectedMaxWeight} 
                        demo={<Weight width={40} height={40}/>} 
                        min={ZERO}
                        max={THIRTY}
                        step={ONE} />
                     
                    <NumberInput 
                        label={dictionary["filters"]['min-backrest']}
                        title={"min-backrest"} 
                        inputValue={selectedMinSeatHeight} 
                        setInputValue={setSelectedMinSeatHeight} 
                        demo={<SeatHeight width={40} height={40}/>} 
                        min={ZERO}
                        max={SIXSTY}
                        step={ONE} />
                     
                    <NumberInput 
                        label={dictionary["filters"]['min-front-wheel']}
                        title={"min-front-wheel"} 
                        inputValue={selectedMinFrontWheelSize} 
                        setInputValue={setSelectedMinFrontWheelSize} 
                        demo={<FrontWheel width={40} height={40}/>} 
                        min={ZERO}
                        max={FIFTY}
                        step={ONE} />
                     
                    <NumberInput 
                        label={dictionary["filters"]['min-back-wheel']}
                        title={"min-back-wheel"} 
                        inputValue={selectedMinBackWheelSize} 
                        setInputValue={setSelectedMinBackWheelSize} 
                        demo={<BackWheel width={40} height={40}/>} 
                        min={ZERO}
                        max={FIFTY}
                        step={ONE} />
                    
                    
                    <NumberInput
                        label={dictionary["filters"]['max-height']}
                        title={"max-height"} 
                        inputValue={selectedMaxHeight} 
                        setInputValue={setSelectedMaxHeight} 
                        demo={<StrollerHeight width={40} height={40}/>} 
                        min={ZERO}
                        max={TWO_HUNDRED}
                        step={TEN} />

                    
                    <NumberInput 
                        label={dictionary["filters"]['max-width']}
                        title={"max-width"} 
                        inputValue={selectedMaxWidth} 
                        setInputValue={setSelectedMaxWidth} 
                        demo={<StrollerWidth width={40} height={40}/>} 
                        min={ZERO}
                        max={ONE_HUNDRED_THIRTY}
                        step={TEN} />

                    
                    <NumberInput 
                        label={dictionary["filters"]['max-length']}
                        title={"max-length"} 
                        inputValue={selectedMaxLength} 
                        setInputValue={setSelectedMaxLength} 
                        demo={<StrollerLength width={40} height={40}/>} 
                        min={ZERO}
                        max={TWO_HUNDRED}
                        step={TEN} />

                    
                    <NumberInput 
                        label={dictionary["filters"]['max-closed-height']}
                        title={"max-closed-height"} 
                        inputValue={selectedClosedMaxHeight} 
                        setInputValue={setSelectedClosedMaxHeight} 
                        demo={<></>} 
                        min={ZERO}
                        max={ONE_HUNDRED_THIRTY}
                        step={TEN} />

                
                    <NumberInput 
                        label={dictionary["filters"]['max-closed-length']}
                        title={"max-closed-length"} 
                        inputValue={selectedClosedMaxLength} 
                        setInputValue={setSelectedClosedMaxLength} 
                        demo={<></>} 
                        min={ZERO}
                        max={ONE_HUNDRED}
                        step={TEN} />

        </>        
    );
}
