import router from "next/router";
import type { NextPage } from "next";
import React from "react";
import FadeIn from "react-fade-in";
const Confirmation: NextPage = () => {
  return (
    <>
      <FadeIn>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="rounded-lg px-8 pt-6 pb-8 mb-4 space-y-2">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-2xl font-bold text-neutral-800">
                Merci de votre confiance !
              </h1>
              <p className="text-center text-neutral-600">
                Votre demande à bien été prise en compte, nous vous contacterons
                dans les plus brefs délais.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="max-w-xs py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={() => router.push("/collect")}
              >
                Revenir à l'accueil
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};
export default Confirmation;
