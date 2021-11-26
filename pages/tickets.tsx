import { getAuth } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import fb from "firebase/compat/app";
import stripe from "stripe";
import "firebase/compat/auth";
const Tickets: NextPage = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    try {
      const { id } = await fb.firestore().collection("tickets").add({
        user: fb.auth().currentUser?.uid,
        amount: 100,
      });
      console.log(id);
      setProcessing(false);
    } catch (err: any) {
      setProcessing(false);
      setError(err.message);
    }
  };

  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {});

  const [ticket, setTicket] = useState({
    name: "",
    expire: "",
    crypt: "",
  });
  return (
    <>
      {error && <div>{error}</div>}
      <FadeIn className="grid grid-cols-1 my-60">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center">
                  Saisie des données banquaire
                </h1>
              </div>
              <div className="mb-4">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Numéro de carte
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded transition py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-first-name"
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        onChange={(e) =>
                          setTicket({ ...ticket, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Expiration
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded transition py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="date"
                        placeholder=""
                        onChange={(e) =>
                          setTicket({ ...ticket, expire: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Cryptogramme visuel
                      </label>
                      <input
                        className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded transition py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        placeholder=""
                        onChange={(e) =>
                          setTicket({ ...ticket, crypt: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <button
                        className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Tickets;
