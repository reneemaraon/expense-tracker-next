import "@/styles/globals.css";

import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const metadata = {
  title: "Expense Tracker",
  description: "A demo expense tracker with oauth",
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="w-full min-h-screen font-inter center-col bg-darker-bg leading-[100%]">
          <div className="p-5 sm:p-7 max-w-[800px] min-h-screen w-full bg-white-bg center-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
