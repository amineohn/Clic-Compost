import type { NextPage } from "next";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
const Collect: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  return (
    <>
      {showModal ? (
        <FadeIn
          className={`fixed z-10 inset-0 overflow-y-auto`}
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ${
              showModal
                ? "transition-height duration-500 ease-in-out"
                : "transition-height duration-500 ease-in-out"
            }`}
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="animate-wiggle inline-block align-bottom bg-black dark:bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center ">
                    <p className="font-bold text-xl"> Ajouter une adresse</p>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2 flex flex-col space-y-2">
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Nom du site"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Adresse"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Téléphone"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="transition mt-3 w-full inline-flex justify-center rounded-md border border-greenDDTV bg-green-400 hover:bg-green-500 dark:border-orangeDDTV shadow-sm px-4 py-2 dark:bg-orangeDDTV dark:hover:bg-orange-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      ) : null}
      {showCollectModal ? (
        <FadeIn
          className={`fixed z-10 inset-0 overflow-y-auto`}
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ${
              showModal
                ? "transition-height duration-500 ease-in-out"
                : "transition-height duration-500 ease-in-out"
            }`}
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="animate-wiggle inline-block align-bottom bg-black dark:bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center ">
                    <p className="font-bold text-xl"> Ajouter une collecte</p>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2 flex flex-col space-y-2">
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Adresse à collecter"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Créneau de collecte"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Fréquence"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowCollectModal(false)}
                  className="transition mt-3 w-full inline-flex justify-center rounded-md border border-greenDDTV bg-green-400 hover:bg-green-500 dark:border-orangeDDTV shadow-sm px-4 py-2 dark:bg-orangeDDTV dark:hover:bg-orange-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      ) : null}
      <FadeIn className="flex flex-col justify-center px-8 my-30">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto mb-16 dark:text-white">
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-blue-400 dark:to-blue-600">
              Adresses
            </h1>
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center font-bold text-gray-900 dark:text-gray-100">
                  Adresses
                </div>
                <div className="grid grid-cols-2 gap-2 justify-center">
                  <div className="inline-flex items-end justify-start space-x-2">
                    <div>
                      <p>DDTV</p>
                      <p>Adresse</p>
                      <p>Téléphone</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                {showModal ? (
                  <button
                    className="bg-green-400 p-2 rounded-lg text-white"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                ) : (
                  <button
                    className="bg-green-400 p-2 rounded-lg text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-blue-400 dark:to-blue-600">
              Collectes
            </h1>
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center font-bold text-gray-900 dark:text-gray-100">
                  Collectes
                </div>
                <div className="grid grid-cols-2 gap-2 justify-center">
                  <div className="inline-flex items-end justify-start space-x-2">
                    <div>
                      <p>Adresse à collecter rue bordeaux bla bla</p>
                      <p>Créneau du lundi matin</p>
                      <p>fréquence: ponctuel</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                {showModal ? (
                  <button
                    className="bg-green-400 p-2 rounded-lg text-white"
                    onClick={() => setShowCollectModal(false)}
                  >
                    Fermer
                  </button>
                ) : (
                  <button
                    className="bg-green-400 p-2 rounded-lg text-white"
                    onClick={() => setShowCollectModal(true)}
                  >
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Collect;
