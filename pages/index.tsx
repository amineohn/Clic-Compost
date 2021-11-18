import type { NextPage } from "next";
import React from "react";
import FadeIn from "react-fade-in";

const Home: NextPage = () => {
  return (
    <>
      <FadeIn className="flex flex-col justify-center px-8 my-30">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto mb-16 dark:text-white">
          <div className="flex-col justify-center items-center">
            <h1 className="pb-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-coolGray-900 to-warmGray-600 dark:bg-gradient-to-bl dark:from-blue-400 dark:to-blue-600">
              Clic-Compost
            </h1>
            <div className="mb-8">
              <p className="mb-4 bg-clip-text bg-gradient-to-tl from-gray-700 via-gray-900 to-black dark:bg-gradient-to-tl dark:from-gray-50 dark:via-gray-100 dark:to-white">
                Auth Clic-Compost
              </p>
            </div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center font-bold text-gray-900 dark:text-gray-100">
                  Auth
                </div>
                <div className="grid grid-cols-2 gap-2 justify-center">
                  <div className="inline-flex items-end justify-start space-x-2">
                    <input
                      className="p-2 rounded-lg placeholder-black text-black transition"
                      placeholder="email"
                    />
                    <input
                      className="p-2 rounded-lg placeholder-black text-black transition"
                      placeholder="password"
                    />
                    <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col justify-center items-center">
            <div className="mb-8"></div>
            <div className="space-y-2">
              <div className="justify-center w-full metric-card max-w-72 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 md:bg-opacity-100 rounded-2xl p-4">
                <div className="flex justify-center items-center text-lg font-bold text-gray-900 dark:text-gray-100">
                  feature
                </div>
                <div className="grid grid-cols-2 gap-2 justify-center items-center">
                  <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Corporis, excepturi, ratione eius nemo eaque reiciendis vel
                    corrupti quos debitis facilis sequi dolor nihil aut ab
                    deleniti porro dolores inventore exercitationem.
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit maxime adipisci obcaecati animi atque expedita rerum
                    libero hic soluta. Pariatur aperiam et dolores ex, explicabo
                    non quod recusandae quibusdam! Natus!
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
