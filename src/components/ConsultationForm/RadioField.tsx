import { ChangeEvent } from "react";

interface RadioFieldProps {
  fieldValue: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioField = ({
  fieldValue,
  checked,
  onChange,
}: RadioFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <label className="flex bg-gray-100 min-w-[50%] cursor-pointer border-2 border-gray-300 rounded-md p-2">
      <input
        className="mr-1"
        type="radio"
        name="Country"
        checked={checked}
        onChange={handleChange}
      />
      {fieldValue}
    </label>
  );
};
