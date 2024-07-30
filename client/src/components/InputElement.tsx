import React from "react";

interface Props {
  placeholder: string;
  type: string;
  value: string;
  setValue: (e: string) => void;
}
function InputElement({ placeholder, type, value, setValue }: Props) {
  return (
    <input
      className="input-box"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
}

export default InputElement;
