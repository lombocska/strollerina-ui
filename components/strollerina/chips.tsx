import React from "react";
import { Chip } from "@nextui-org/chip";
import { getDictionary } from "get-dictionary";

export default function Chips({ json, dictionary, commonTags }: {
  json: any; 
  dictionary: Awaited<ReturnType<typeof getDictionary>>["strollers"]["tags"]["main-card"]["chip"];
  commonTags: string[];
}) {
  
  const renderChips = () => {
    return json.map((tag: string, index: number) => {
      const isCommonTag = commonTags && commonTags.includes(tag);

      const chipClass = isCommonTag 
        ? 'bg-[#d2ada7]'
        : ''; 

      return (
        <Chip key={index} className={`m-1 ${chipClass}`} variant="bordered">
          {dictionary[tag] || tag}
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
