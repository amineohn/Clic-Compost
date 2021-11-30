import React, { useState } from "react";
import { Firebase } from "../libs/firebase";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
const Navigation = () => {
  const router = useRouter();
  const fire = new Firebase();
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
          <div className="relative bg-greenDDTV text-gray-300 p-4 rounded-lg shadow-lg flex flex-col w-64">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    (fire.getPhotoUrl() as string)
                      ? (fire.getPhotoUrl() as string)
                      : "/static/images/blank-profile.png"
                  }
                  alt={fire.getUserName() as string}
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-green-50">
                    {fire.getUserName() ? fire.getUserName() : "Anonyme"}
                  </p>
                  <p className="text-xs text-green-200">
                    {fire.getEmail() ? fire.getEmail() : "anonyme@email.com"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              {!fire.getUser() ? (
                <>
                  <a
                    onClick={() => {
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-4 h-5 w-5 !text-green-100 group-hover:!text-green-100 group-focus:!text-green-100 transition ease-in-out duration-150"
                    >
                      <path
                        fill="currentColor"
                        d="M416 448h-84c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h84c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zM167.1 83.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L260.8 230H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L147.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                      ></path>
                    </svg>
                    <span className="text-green-100">Connexion</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      fire.signOut();
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-4 h-5 w-5 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    >
                      <path
                        fill="currentColor"
                        d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"
                      ></path>
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
