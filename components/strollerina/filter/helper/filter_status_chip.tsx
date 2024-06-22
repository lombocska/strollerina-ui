import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
import useTranslation from 'next-translate/useTranslation'
import { Chip } from "@nextui-org/chip";

export default function FilterStatusChips({json}: {json:any}) {
  
  const renderChips = () => {
    return Object.entries(json).map(([key, value]) => {
        // Stringify complex values for display purposes
        const displayValue = value == null ? "" : Array.isArray(value) ? value.join(", ") : value.toString();
        return (
            <Chip key={key} className="m-1">
                {key}: {displayValue}
            </Chip>
        );
    });
};

return (
    <div className="flex flex-wrap">
        {renderChips()}
    </div>
);
}
