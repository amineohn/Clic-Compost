import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
const Navigation = () => {
  const auth = getAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Transition
        show={showModal}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <nav className="fixed z-auto inset-0 flex items-start justify-end mt-28 mr-5">
          <div className="fixed inset-0">
            <div className="absolute inset-0" />
          </div>
          <div className="relative bg-gray-900 text-gray-300 p-4 rounded-lg shadow-lg flex flex-col w-64">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    (auth.currentUser?.photoURL as string)
                      ? (auth.currentUser?.photoURL as string)
                      : "https://i.imgur.com/2njXKZu.png"
                  }
                  alt="avatar"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold">
                    {auth.currentUser?.displayName
                      ? auth.currentUser?.displayName
                      : "Anonyme"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {auth.currentUser?.email
                      ? auth.currentUser?.email
                      : "anonyme@email.com"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              {!auth.currentUser ? (
                <>
                  <a
                    onClick={() => {
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-800 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                  >
                    <svg
                      className="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Connexion</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      auth.signOut();
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-800 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                  >
                    <svg
                      className="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Déconnexion</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </Transition>
      <div>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-xl px-4 py-8 mx-auto md:py-12 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="mt-6 z-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="ml-4">
                      <button
                        className="text-white font-medium hover:bg-white hover:bg-opacity-20 p-2 rounded-xl transition"
                        onClick={() => setShowModal(true)}
                      >
                        <button
                          className="p-1 text-white focus:outline-none focus:shadow-outline"
                          aria-label="Close sidebar"
                          onClick={() => setShowModal(!showModal)}
                        >
                          <svg
                            className="h-6 w-6 text-white animate-pulse"
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-50 top-0 inset-x-0 p-6 transition duration-500 ease-in-out transform lg:bg-transparent lg:bg-opacity-100 backdrop-blur-sm bg-opacity-20">
        <div className="absolute inset-0 flex">
          <div
            className="w-1/2 h-full"
            onClick={() => setShowModal(!showModal)}
          ></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4 py-3">
            <div className="flex-1 text-white">
              <h3 className="font-semibold text-xl tracking-tight"></h3>
            </div>
            <div className="flex-shrink-0">
              {showModal ? (
                <button
                  className="p-1 text-black focus:outline-none focus:shadow-outline"
                  aria-label="Close sidebar"
                  onClick={() => setShowModal(!showModal)}
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
                  onClick={() => setShowModal(!showModal)}
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
