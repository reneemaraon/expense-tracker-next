import { ReactNode, useRef, useState } from "react";
import ErrorMessage from "../Expense/ErrorMessage";

interface TextInputProps {
  value: string;
  onValueChange(e: any): any;
  errorMessage?: string;
  placeholder: string;
  icon?: boolean;
  children: ReactNode;
  error?: string;
}

const TextInput = ({
  value,
  onValueChange,
  errorMessage,
  placeholder,
  icon,
  children,
  error,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (event: any) => {
    onValueChange(event.target.value);
  };

  return (
    <div
      onClick={focusInput}
      className="cursor-text w-full flex flex-col gap-2"
    >
      <div
        className={`${
          isFocused ? "border-brand-orange" : "border-transparent"
        } border bg-white w-full max-w-[500px] rounded-lg h-14 px-6 py-1.5 items-center gap-5 flex`}
      >
        {icon && (
          <div
            className={`w-5 ${
              isFocused ? "text-brand-orange" : "text-light-gray-text"
            }`}
          >
            {children}
          </div>
        )}
        <input
          type="text"
          className="leading-tight w-full bg-transparent focus:outline-none placeholder-light-gray-text"
          placeholder={placeholder || "Write a headline here"}
          value={value}
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
