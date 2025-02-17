"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="absolute top-0 text-dark-text hover:text-white left-0 flex gap-2 items-center cursor-pointer hover:bg-brand-blue/80 transition-color duration-300 rounded-md p-2"
    >
      <ChevronLeft />
      Go back
    </div>
  );
};

export default GoBackButton;
