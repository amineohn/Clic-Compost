import React from "react";
import ToggleTheme from "./toggleTheme";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="top-0 z-50 flex items-center justify-between w-full max-w-4xl p-8 mx-auto my-0 text-gray-900 bg-transparent md:my-8 dark:text-gray-100">
      <ToggleTheme />
      <div>
        <Link href="/">
          <a
            className={`p-1 font-bold text-gray-900 transition cursor-pointer sm:p-4 sm:pb-1.5 sm:pt-1.5 rounded-full dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:bg-opacity-25`}
          >
            Home
          </a>
        </Link>
        <Link href="/collect">
          <a className="p-1 font-bold text-gray-900 transition cursor-pointer sm:p-4 sm:pb-1.5 sm:pt-1.5 rounded-full dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:bg-opacity-25">
            Collectes
          </a>
        </Link>
        <Link href="/tickets">
          <a className="p-1 font-bold text-gray-900 transition cursor-pointer sm:p-4 sm:pb-1.5 sm:pt-1.5 rounded-full dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:bg-opacity-25">
            Tickets
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
