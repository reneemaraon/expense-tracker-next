import React, { ReactNode } from "react";

interface ButtonProps {
  disabled?: boolean;
  styleSet?: "gradient";
  size?: "defaultSize";
  edge?: "defaultEdge" | "rounded";
  onClick?(): void;
  children: ReactNode;
}

const CustomButton = ({
  disabled = false,
  styleSet = "gradient",
  size = "defaultSize",
  edge = "defaultEdge",
  onClick,
  children,
}: ButtonProps) => {
  const styleSets = {
    gradient:
      "main-gradient text-white hover:bg-brand-orange main-gradient-hover",
  };

  const sizeSets = {
    defaultSize: "h-12 px-5 py-3 gap-2 font-medium text-base",
  };

  const edgeStyles = {
    defaultEdge: "rounded-lg",
    rounded: "rounded-full",
  };

  const stateStyle = disabled ? "opacity-50 pointer-events-none" : "";

  return (
    <button
      className={`py-2 px-4 w-full max-w-[400px] justify-center items-center inline-flex ${stateStyle} ${edgeStyles[edge]} ${sizeSets[size]} ${styleSets[styleSet]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
