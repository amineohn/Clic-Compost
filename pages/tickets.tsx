import type { NextPage } from "next";
import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";

import FadeIn from "react-fade-in";
const Tickets: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
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
            className={`flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
          >
            <div className="fixed inset-0" aria-hidden="true" />

            <span className="inline-block align-middle items-center place-items-center justify-center h-screen">
              &#8203;
            </span>

            <div className="bg-black animate-wiggle inline-block align-middle rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center ">
                    <p className="font-bold text-xl"> Moyen de paiement</p>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                      id="modal-title"
                    ></h3>
                    <div className="mt-2 grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 m-auto gap-2">
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="cc-number"
                        maxLength={19}
                        placeholder="xxxx xxxx xxxx xxxx"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs"
                        required
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs"
                        placeholder="Expiration"
                        required
                      />
                      <input
                        type="text"
                        className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg max-w-xs"
                        placeholder="Cryptogramme visuel"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="transition mt-3 w-full inline-flex justify-center rounded-md bg-greenDDTV hover:bg-green-800 px-4 py-2 dark:hover:bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
              Tickets
            </h1>
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center font-bold text-gray-900 dark:text-gray-100">
                  Paiement
                </div>
                <div className="grid grid-cols-2 gap-2 justify-center">
                  <div className="inline-flex items-end justify-start space-x-2">
                    <div>
                      <p>Numéro de carte</p>
                      <p>Expiration</p>
                      <p>Cryptogramme visuel</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-greenDDTV p-2 rounded-lg text-white"
                  onClick={() => setShowModal(true)}
                >
                  Moyen de paiement
                </button>
              </div>
            </div>
          </div>
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-gray-50 dark:to-gray-200">
              Factures
            </h1>
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-2 justify-center">
                  <div className="inline-flex items-end justify-start space-x-2">
                    <div>
                      <p>Aucune facture</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center"></div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Tickets;
