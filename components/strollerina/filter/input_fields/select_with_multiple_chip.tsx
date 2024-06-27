'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { useTheme } from 'next-themes';

export default function SelectWithMultipleChip({ items, values, handleSelectionChange, label, plHolder, shouldTranslate, dictionary }) {
  const { theme } = useTheme();

  // Ensure values are iterable (Array or Set)
  const selectedValues = Array.isArray(values) ? values : Array.from(values);

  console.log("selectedValues:", selectedValues);

  return (
    <div className="flex flex-col gap-2 m-3">
      <Select
        label={label}
        labelPlacement='outside'
        selectionMode="multiple"
        placeholder={plHolder}
        selectedKeys={selectedValues}
        className="max-w-xs"
        onSelectionChange={handleSelectionChange}
      >
        {items?.map((item) => (
          <SelectItem key={item.value} className={`${theme === 'dark' ? 'dark:text-white' : ' text-black'}`}>
            {shouldTranslate ? dictionary[item.name] : item.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
