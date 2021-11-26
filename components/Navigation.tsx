import React, { useState } from "react";
import Link from "next/link";
import ToggleTheme from "./toggleTheme";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
// language=nextjs, tailwindcss, typescript
const Navigation = () => {
  const auth = getAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <nav className="sticky bottom-0 z-50 flex items-center justify-between flex-wrap bg-greenDDTV p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link href="/">
              <a className="font-semibold text-xl tracking-tight">
                Clic Compost
              </a>
            </Link>
          </div>

          <div className="flex items-center w-auto">
            <div className="text-sm lg:flex-grow">
              {!auth.currentUser ? (
                <>
                  <Link href="/">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
                      Connexion
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 cursor-default space-y-0 lg:space-x-2">
                    <a className="block mb-1 lg:inline-block lg:-mb-1.5 text-green-200 hover:text-white cursor-default">
                      <img
                        src={
                          auth.currentUser.photoURL
                            ? (auth.currentUser.photoURL as string)
                            : "https://i.stack.imgur.com/34AD2.jpg"
                        }
                        className="rounded-full w-6 h-6 mr-2"
                        alt={auth.currentUser.displayName as string}
                      />
                    </a>
                    <span className="inline flex-shrink-0">
                      Bienvenue {auth.currentUser.displayName}
                    </span>
                  </a>
                  <a
                    className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 cursor-pointer"
                    onClick={() => {
                      auth.signOut();
                      router.push("/");
                    }}
                  >
                    Déconnexion
                  </a>
                </>
              )}
            </div>
            <ToggleTheme />
          </div>
        </nav>
      )}

      <div className="fixed z-50 top-0 inset-x-0 p-6 transition duration-500 ease-in-out transform lg:bg-transparent lg:bg-opacity-100 backdrop-blur-sm bg-opacity-20">
        <div className="absolute inset-0 flex">
          <div
            className="w-1/2 h-full"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4 py-3">
            <div className="flex-1 text-white">
              <h3 className="font-semibold text-xl tracking-tight"></h3>
            </div>
            <div className="flex-shrink-0">
              {isOpen ? (
                <button
                  className="p-1 text-black focus:outline-none focus:shadow-outline"
                  aria-label="Close sidebar"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="h-6 w-6 text-black animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="p-1 text-black focus:outline-none focus:shadow-outline"
                  aria-label="Close sidebar"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="h-6 w-6 text-black animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
