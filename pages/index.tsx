import type { NextPage } from "next";
import React from "react";
import FadeIn from "react-fade-in";

const Home: NextPage = () => {
  return (
    <>
      <FadeIn className="flex flex-col justify-center px-8 my-30">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto mb-16 dark:text-white">
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-gray-50 dark:to-gray-200">
              Clic-Compost
            </h1>
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center font-bold text-gray-900 dark:text-gray-100">
                  Login
                </div>
                <div className="grid grid-cols-1 gap-2 justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 md:grid-cols-1 space-y-2">
                    <input
                      className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg transition"
                      placeholder="email"
                    />
                    <input
                      className="bg-gray-100 dark:bg-gray-800 bg-opacity-25 border-none placeholder-white p-2 rounded-lg transition"
                      placeholder="password"
                    />
                    <button className="p-2 rounded-lg bg-greenDDTV hover:bg-green-800 transition text-white">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Home;
