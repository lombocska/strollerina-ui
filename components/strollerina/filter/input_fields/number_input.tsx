import React from "react";
import { Input } from "@nextui-org/input";
import { maxHeaderSize } from "http";
import useTranslation from 'next-translate/useTranslation'
import { NumberInputProps } from "types";

const NumberInput: React.FC<NumberInputProps> = ({
  title,
  inputValue,
  setInputValue,
  demo,
  endContent,
  min,
  max,
  step,
  transNM
}) => {
  const { t } = useTranslation(transNM);

  return (
    
    <Input
        key={title}
        className="mb-10 input-no-border"
        fullWidth
        type="number"
        label={t('filters.' + title)}
        labelPlacement="outside"
        value={inputValue}
        onValueChange={setInputValue}
        min={min}
        max={max}
        step={step}
        startContent={demo}
        endContent={endContent ? endContent : <></>}
    />
  );
}

export default NumberInput; // Exporting NumberInput as default export
