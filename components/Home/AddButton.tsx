"use client";
import { AddIcon } from "@/assets/Icons";
import Dropdown, { Option } from "../common/Dropdown";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AddButton() {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setShowDropDown((prevValue) => !prevValue);
  };

  const handleOutsideClick = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="fixed object-center bottom-10">
      <div className="relative">
        {showDropDown && (
          <div className="absolute bottom-full left-0 mx-auto mb-3 w-44">
            <Dropdown>
              <Option
                text="Add Expense"
                onSelect={() => redirect("/transactions/add?type=expense")}
              />
              <Option
                text="Add Income"
                onSelect={() => redirect("/transactions/add?type=income")}
              />
            </Dropdown>
          </div>
        )}
        <div
          onClick={toggleDropDown}
          className="cursor-pointer  w-[60px] h-[60px] rounded-full main-gradient flex items-center justify-center"
        >
          <div className="w-10 h-10 stroke-[1.5px] text-white stroke-white fill-white">
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddButton;
