"use client";
import { Cog } from "@/assets/Icons";
import { useEffect, useRef, useState } from "react";
import Dropdown, { Option } from "../common/Dropdown";
import { logout } from "@/actions/actions";

const TopMenu = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setShowDropDown((prevValue) => !prevValue);
  };

  const onLogout = () => {
    logout();
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
    <div ref={dropdownRef} className="relative">
      <div className="w-9 h-9 center-col justify-center rounded-lg bg-white">
        <div
          onClick={toggleDropDown}
          className="cursor-pointer w-5 h-5 text-light-gray-text icon"
        >
          <Cog />
        </div>
      </div>
      {showDropDown && (
        <div className="absolute top-full mt-2 right-0">
          <Dropdown>
            <Option text="Logout" onSelect={onLogout} />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
