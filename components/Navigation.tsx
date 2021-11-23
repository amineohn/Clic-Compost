import React from "react";
import Link from "next/link";
import ToggleTheme from "./toggleTheme";
import { getAuth } from "firebase/auth";
// language=nextjs, tailwindcss, typescript
const Navigation = () => {
  const auth = getAuth();
  return (
    <>
      <nav className="sticky bottom-0 z-50 flex items-center justify-between flex-wrap bg-greenDDTV p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <a className="font-semibold text-xl tracking-tight">Clic Compost</a>
          </Link>
        </div>

        <div className="flex items-center w-auto">
          <div className="text-sm lg:flex-grow">
            {auth.currentUser ? (
              <Link href="/">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
                  Home
                </a>
              </Link>
            ) : null}
            <Link href="/collect">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
                Collecte
              </a>
            </Link>
            <Link href="/tickets">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
                Tickets
              </a>
            </Link>
            {auth.currentUser ? (
              <a
                className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 cursor-pointer"
                onClick={() => getAuth().signOut()}
              >
                Déconnexion
              </a>
            ) : null}
          </div>
          <ToggleTheme />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
