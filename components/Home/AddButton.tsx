"use client";
import { AddIcon } from "@/assets/Icons";
import Dropdown from "../common/Dropdown";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
              <Link
                className="cursor-pointer w-full h-12 px-4 py-2.5 hover:bg-white rounded-lg justify-between items-center inline-flex"
                href="/transactions/add?type=expense"
              >
                Add Expense
              </Link>
              <Link
                className="cursor-pointer w-full h-12 px-4 py-2.5 hover:bg-white rounded-lg justify-between items-center inline-flex"
                href="/transactions/add?type=income"
              >
                Add Income
              </Link>
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
