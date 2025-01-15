import React, { ReactNode } from "react";

export interface OptionProps {
  text: string;
  selected?: boolean;
  onSelect(): void;
}

export interface DropdownProps {
  children: ReactNode;
}

export const Option = ({ text, selected, onSelect }: OptionProps) => {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer w-full h-12 px-4 py-2.5 hover:bg-white rounded-lg justify-between items-center inline-flex"
    >
      <div className={`text-base text-dark-text`}>{text}</div>
      <div className="CheckContainer justify-between items-center flex">
        {selected && (
          <div className="Icon px-1 py-1 justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Dropdown({ children }: DropdownProps) {
  return (
    <div className="Dropdown w-full p-2.5 bg-white-bg rounded-lg shadow border flex-col justify-center items-center flex">
      {children}
    </div>
  );
}
