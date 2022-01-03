import React, { useState } from "react";
import { Firebase } from "../libs/firebase";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { Permission } from "../libs/permission";
import { Rights } from "../libs/types";
const Navigation = () => {
  const router = useRouter();
  const fire = new Firebase();
  const [showModal, setShowModal] = useState(false);
  const permission = new Permission();
  return (
    <>
      {router.pathname !== "/dashboard" && (
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
              <div className="relative bg-greenDDTV text-neutral-300 p-4 rounded-lg shadow-lg flex flex-col w-64">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        (fire.photoUrl() as string)
                          ? (fire.photoUrl() as string)
                          : (fire.defaultPhotoUrl() as string)
                      }
                      alt={fire.userName() as string}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-green-50">
                        {fire.userName() ? fire.userName() : "Anonyme"}
                      </p>
                      <p className="text-xs text-green-200">
                        {fire.email() ? fire.email() : "anonyme@email.com"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={router.pathname !== "/" ? "mt-5 space-y-2" : ""}
                >
                  {!fire.user() ? (
                    <>
                      {router.pathname !== "/" ? (
                        <a
                          onClick={() => {
                            router.push("/");
                            setShowModal(false);
                          }}
                          className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 hover:!bg-opacity-40 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="mr-4 h-5 w-5 !text-green-100 group-hover:!text-green-100 group-focus:!text-green-100 transition ease-in-out duration-150"
                          >
                            <path
                              fill="currentColor"
                              d="M416 448h-84c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h84c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zM167.1 83.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L260.8 230H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L147.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                            />
                          </svg>
                          <span className="text-green-100">Connexion</span>
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {router.pathname === "/account/reset" ? (
                        <a
                          onClick={() => {
                            router.push("/collect");
                            setShowModal(false);
                          }}
                          className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                        >
                          <svg
                            className="mr-4 h-5 w-5 text-neutral-300 group-hover:text-neutral-300 group-focus:text-neutral-300 transition ease-in-out duration-150"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path
                              fill="currentColor"
                              d="M621.3 237.3l-58.5-58.5c-12-12-28.3-18.7-45.3-18.7H480V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64v336c0 44.2 35.8 80 80 80 26.3 0 49.4-12.9 64-32.4 14.6 19.6 37.7 32.4 64 32.4 44.2 0 80-35.8 80-80 0-5.5-.6-10.8-1.6-16h163.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H624c8.8 0 16-7.2 16-16v-85.5c0-17-6.7-33.2-18.7-45.2zM80 432c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm128 0c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm272-224h37.5c4.3 0 8.3 1.7 11.3 4.7l43.3 43.3H480v-48zm48 224c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"
                            />
                          </svg>
                          <span>Collecte</span>
                        </a>
                      ) : null}
                      {router.pathname !== "/account/update" ? (
                        <a
                          onClick={() => {
                            router.push("/account/update");
                            setShowModal(false);
                          }}
                          className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 hover:!bg-opacity-40 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                        >
                          <svg
                            className="mr-4 h-5 w-5 text-neutral-300 group-hover:text-neutral-300 group-focus:text-neutral-300 transition ease-in-out duration-150"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                            ></path>
                          </svg>
                          <span>Compte</span>
                        </a>
                      ) : null}
                      {permission.isAdmin() ||
                        (permission.has(Rights.Admin) && (
                          <a
                            onClick={() => {
                              router.push("/dashboard");
                              setShowModal(false);
                            }}
                            className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 hover:!bg-opacity-40 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                          >
                            <svg
                              className="mr-4 h-5 w-5 text-neutral-300 group-hover:text-neutral-300 group-focus:text-neutral-300 transition ease-in-out duration-150"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="currentColor"
                                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                              ></path>
                            </svg>
                            <span>Dashboard</span>
                          </a>
                        ))}
                      {router.pathname !== "/account/reset" ? (
                        <a
                          onClick={() => {
                            router.push("/account/reset");
                            setShowModal(false);
                          }}
                          className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 hover:!bg-opacity-40 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                        >
                          <svg
                            className="mr-4 h-5 w-5 text-neutral-300 group-hover:text-neutral-300 group-focus:text-neutral-300 transition ease-in-out duration-150"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                            />
                          </svg>
                          <span>Réinitialiser votre mot de passe</span>
                        </a>
                      ) : null}
                      <a
                        onClick={() => {
                          fire.signOut();
                          router.push("/");
                          setShowModal(false);
                        }}
                        className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white !bg-green-900 hover:!bg-opacity-40 !bg-opacity-20 focus:outline-none focus:!bg-green-800 transition ease-in-out duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="mr-4 h-5 w-5 text-neutral-300 group-hover:text-neutral-300 group-focus:text-neutral-300 transition ease-in-out duration-150"
                        >
                          <path
                            fill="currentColor"
                            d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"
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
          <div className="fixed z-50 top-0 inset-x-0 p-6 transition duration-500 ease-in-out transform lg:bg-transparent lg:bg-opacity-100 backdrop-blur-none bg-opacity-20">
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full"
                onClick={() => setShowModal(!showModal)}
              ></div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 py-3">
                <div className="flex-1 text-white">
                  <div className="inline-flex">
                    <a
                      href="https://www.linkedin.com/company/les-détritivores/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="mr-2 text-neutral-900 hover:text-neutral-700 transition duration-200"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/lesdetritivores/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="mr-2 text-neutral-900 hover:text-neutral-700 transition duration-200"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/lesdetritivores"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="mr-2 text-neutral-900 hover:text-neutral-700 transition duration-200"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z" />
                      </svg>
                    </a>
                  </div>
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
      )}
    </>
  );
};

export default Navigation;
