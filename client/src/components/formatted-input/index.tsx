import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";

interface FormattedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mask: string;
}

const FormattedInput: React.FC<FormattedInputProps> = ({
  name,
  label,
  mask,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: HTMLInputElement, value: string) {
        setFormattedValue(value);
      },
      clearValue() {
        setFormattedValue("");
      },
    });
  }, [fieldName, registerField]);

  const formatValue = (value: string) => {
    if (!value) return value;

    const digitsOnly = value.replace(/\D/g, "");
    const maskArray = mask.split("");
    const formattedValue = [];

    let j = 0;
    for (let i = 0; i < maskArray.length; i++) {
      if (maskArray[i] === "x") {
        if (digitsOnly[j]) {
          formattedValue.push(digitsOnly[j]);
          j++;
        }
      } else {
        formattedValue.push(maskArray[i]);
      }
    }

    return formattedValue.join("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formatted = formatValue(inputValue);
    setFormattedValue(formatted);
  };

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between">
        <p className="text-black-secondary text-base font-normal leading-9">
          {label}
        </p>
      </div>
      <input
        className="w-full py-3 pl-4 pr-8 rounded-lg box-border border-[1px] border-gray-300 focus-within:ring-2 ring-cyan-600 text-gray-900 focus:border-transparent"
        value={formattedValue}
        onChange={handleChange}
        ref={inputRef}
        {...rest}
      />
    </div>
  );
};

export default FormattedInput;