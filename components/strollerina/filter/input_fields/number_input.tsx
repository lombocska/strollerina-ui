import React from "react";
import { Input } from "@nextui-org/input";
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
  label
}) => {


  return (
    <Input
      style={{
        color: "inherit",
        caretColor: "transparent",
        borderColor: 'transparent'
      }}
      key={title}
      className="mb-10 input-no-border"
      fullWidth
      type="number"
      label={label}
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

export default NumberInput;
