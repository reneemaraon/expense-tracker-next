"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSpinner from "./Loading";

interface Props {
  children?: ReactNode;
}

const ClientLayout = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true); // Trigger loading state
    const timeout = setTimeout(() => setIsLoading(false), 300); // Simulate delay for route change

    return () => clearTimeout(timeout);
  }, [pathname]); // Detect route changes based on pathname

  return (
    <div className="w-full min-h-screen font-inter center-col overflow-y-scroll bg-darker-bg leading-[100%]">
      <div className="p-5 sm:p-7 max-w-[800px] min-h-[100vw] h-full w-full bg-white-bg center-col">
        {isLoading && (
          <div className="center-col justify-center w-full h-full">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && children}
        {/* {children} */}
      </div>
    </div>
  );
};

export default ClientLayout;
