import React, { useState, useRef, useEffect, ReactNode } from "react";
import Dropdown, { Option, OptionProps } from "@/components/common/Dropdown";

interface SelectionProps {
  options: OptionProps[];
  children: ReactNode;
  icon?: boolean;
  placeholder: string;
  error?: string;
  value: { name: string; value: any };
}

const SelectInput = ({
  placeholder = "",
  value,
  options,
  icon = false,
  children,
  error,
}: SelectionProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const dropdownRef = useRef(null);
  const valueSelected = value.value.length > 0;

  const handleOutsideClick = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full flex-col flex gap-2">
      <div
        onClick={toggleDropdown}
        ref={dropdownRef}
        className="relative hover:cursor-pointer w-full"
      >
        <div
          className={`${
            isDropdownVisible ? "border-brand-orange" : "border-transparent"
          } ${
            !valueSelected && "text-light-gray-text"
          } border bg-white w-full relative max-w-[500px] rounded-lg h-14 px-6 py-1.5 items-center gap-5 flex`}
        >
          {icon && (
            <div
              className={`w-5 ${
                isDropdownVisible ? "text-brand-orange" : "text-light-gray-text"
              }`}
            >
              {children}
            </div>
          )}
          {valueSelected ? value.name : placeholder}
        </div>

        {isDropdownVisible && (
          <div className="absolute w-full top-full left-0 mt-1 z-40">
            <Dropdown>
              {options.map((option) => (
                <Option
                  key={option.text}
                  text={option.text}
                  selected={option.selected}
                  onSelect={option.onSelect}
                />
              ))}
            </Dropdown>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
