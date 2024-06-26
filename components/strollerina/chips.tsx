import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
import { Chip } from "@nextui-org/chip";
import { getDictionary } from "get-dictionary";

export default function Chips({json, dictionary}: {
    json:any, 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]["tags"]["main-card"]["chip"]
}) {
  
     const renderChips = () => {
        return Object.entries(json).map(([key, value]) => {
            // Stringify complex values for display purposes
            const displayValue = value == null ? "" : Array.isArray(value) ? value.join(", ") : value.toString();
            return (
                <Chip key={key} className="m-1" variant="bordered">
                    {dictionary[displayValue]}
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
