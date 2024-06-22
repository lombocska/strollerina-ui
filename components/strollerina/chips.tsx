import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
import useTranslation from 'next-translate/useTranslation'
import { Chip } from "@nextui-org/chip";

export default function Chips({json, translationNS, tPrefix}: {json:any, translationNS:string, tPrefix:string}) {
  
    const { t, lang } = useTranslation();

    const tKey = tPrefix ? tPrefix : "";

     const renderChips = () => {
        return Object.entries(json).map(([key, value]) => {
            // Stringify complex values for display purposes
            const displayValue = value == null ? "" : Array.isArray(value) ? value.join(", ") : value.toString();
            const trans = translationNS + tKey + displayValue;
            return (
                <Chip key={key} className="m-1" variant="bordered">
                    {t(trans)}
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
