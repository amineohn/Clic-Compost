import { Transition } from "@headlessui/react";
import type { NextPage } from "next";
import React, { Fragment, useState } from "react";
import FadeIn from "react-fade-in";
const Collect: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  return (
    <>
      <Transition
        as={Fragment}
        show={showModal}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className={`absolute z-10 inset-0 overflow-y-auto`}>
          <div
            className={`flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ${
              showModal ? "fade-in" : "fade-in"
            }`}
          >
            <div className="fixed inset-0 bg-black" aria-hidden="true" />

            <span className="inline-block align-middle items-center place-items-center justify-center h-screen">
              &#8203;
            </span>

            <div className="animate-wiggle inline-block align-middle rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center ">
                    <p className="font-bold text-xl"> Ajouter une adresse</p>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2 grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 m-auto gap-2">
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Nom du site"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Adresse"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Téléphone"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="transition mt-3 w-full inline-flex justify-center rounded-md bg-blue-400 hover:bg-blue-500 dark:border-orangeDDTV px-4 py-2 dark:bg-orangeDDTV dark:hover:bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition
        as={Fragment}
        show={showCollectModal}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className={`absolute z-10 inset-0 overflow-y-auto`}>
          <div
            className={`flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ${
              showModal
                ? "transition-height duration-500 ease-in-out"
                : "transition-height duration-500 ease-in-out"
            }`}
          >
            <div className="fixed inset-0 bg-black" aria-hidden="true" />

            <span className="inline-block align-middle items-center place-items-center justify-center h-screen">
              &#8203;
            </span>

            <div className="animate-wiggle inline-block align-middle rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center ">
                    <p className="font-bold text-xl"> Ajouter une collecte</p>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2 grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 m-auto gap-2">
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Adresse à collecter"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Créneau de collecte"
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs	"
                        placeholder="Fréquence"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowCollectModal(false)}
                  className="transition mt-3 w-full inline-flex justify-center rounded-md bg-blue-400 hover:bg-blue-500 dark:border-orangeDDTV px-4 py-2 dark:bg-orangeDDTV dark:hover:bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <FadeIn className="flex flex-col justify-center px-8 my-30">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto mb-16 dark:text-white">
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-gray-50 dark:to-gray-200">
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
                <button
                  className="bg-blue-400 p-2 rounded-lg text-white"
                  onClick={() => setShowModal(true)}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-gray-50 dark:to-gray-200">
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
                <button
                  className="bg-blue-400 p-2 rounded-lg text-white"
                  onClick={() => setShowCollectModal(true)}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Collect;
