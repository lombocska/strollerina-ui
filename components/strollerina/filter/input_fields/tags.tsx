'use client';

import { CheckIcon } from '@/components/icons';
import { clearLocalStorage, useLocalStorage } from 'lib/LocalStorageAPI';
import { Tag, TagsProps } from 'types';
import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';
import { useEffect } from 'react';
import { getDictionary } from 'get-dictionary';

export default function Tags({tags, section, lsName, isCleared, setFilters, dictionary} : 
    {
        tags: Tag[];
        section: string;
        lsName: string;
        isCleared: boolean;
        setFilters: React.Dispatch<React.SetStateAction<any>>;
        dictionary: Awaited<ReturnType<typeof getDictionary>>["tags"]
    }
) {

    const [selectedTags, setSelectedTags] = useLocalStorage(lsName, []);

    useEffect(() => {
        if (isCleared) {
            console.log(lsName + " filter clearing")
            setSelectedTags([]);
            clearLocalStorage(lsName)
        }
    }, [isCleared]); 

    useEffect(() => {
        if (setFilters) {
            console.log("Selected tags:", selectedTags);
            setFilters((filters: any) => {
                console.log("Previous filters:", filters);
                const updatedFilters = {
                    ...filters,
                    tags: selectedTags,
                };
                console.log("Updated filters:", updatedFilters);
                return updatedFilters;
            });
        }
    }, [selectedTags, setFilters]);

    const handleTagClick = (tag : Tag) => {
        if (selectedTags.includes(tag) && selectedTags.length === 1) {
            setSelectedTags(selectedTags.filter((selectedTag : Tag) => selectedTag !== tag));
        } else if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag : Tag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <>
        {tags.map((tag : Tag) => {
            let label = tag.label;
            let tooltip = tag.tooltip;
            return (
                <div key={"div-" + tag.name}>
                    {tag.section === section &&
                    
                        // <Tooltip 
                        //     key={tag.name}
                        //     placement={'top-start'}
                        //     content={dictionary["tooltip"][tooltip]}
                        //     className="bg-stone-100">
                            <Chip
                                key={"chip-" + tag.name}
                                // classNames={{
                                //     base: "bg-gradient-to-br from-strollerina_green-100 to-strollerina_green-300 border-small ",
                                //     content: "drop-shadow shadow-black text-white",
                                // }}
                                className='mb-5'
                                variant={selectedTags.includes(tag.name) ? 'solid' : 'bordered'}
                                onClick={() => handleTagClick(tag.name)}
                                startContent={selectedTags.includes(tag.name) ? <CheckIcon size={18}/>  : <></>}
                            >
                                {dictionary["main-card"]["chip"][label.split('.').pop()]}
                            </Chip>
                        // </Tooltip>
                    }
                </div>
            );
            })}
        </>
    );
}
