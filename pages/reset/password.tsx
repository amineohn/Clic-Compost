import type { NextPage } from "next";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import fb from "firebase/compat/app";
import Loading from "../../components/loading";
import "firebase/compat/auth";

const forgetPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const forgetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Veuillez entrer votre email");
      setInterval(() => {
        setError("");
      }, 3500);
      setLoading(false);
      return;
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setError("Veuillez entrer un email valide");
      setLoading(false);
      return;
    }

    if (success) {
      setLoading(false);
      return;
    }
    try {
      await fb.auth().sendPasswordResetEmail(email);
      setLoading(false);
      setSuccess(true);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <FadeIn className="my-72 lg:my-80 flex flex-col items-center justify-center">
        <div className="w-full max-w-xs space-y-2">
          {error && (
            <FadeIn className="bg-red-100 border border-red-100 text-red-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <div className="inline-flex space-x-2">
                <div className="">
                  <svg
                    className="fill-current cursor-pointer text-red-500 hover:text-red-600 transition w-4 h-4 flex justify-items-end"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setError("")}
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </div>
                <div className="flex">
                  <p className="text-red-500 text-xs italic">{error}</p>
                </div>
              </div>
            </FadeIn>
          )}

          {success && (
            <FadeIn className="bg-green-100 border border-green-100 text-green-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <div className="inline-flex space-x-2">
                <div className="">
                  <svg
                    className="fill-current cursor-pointer text-green-500 hover:text-green-600 transition w-4 h-4 flex justify-items-end"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setSuccess(false)}
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </div>
                <div className="flex">
                  <p className="text-green-500 text-xs italic">
                    Nous vous avons envoyé un e-mail pour réinitialiser votre
                    mot de passe.
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="text-center text-2xl font-bold">
                Mot de passe oublié
              </h1>
              <p className="text-center text-gray-700 text-xs">
                Entrez votre adresse email pour réinitialiser votre mot de passe
              </p>
            </div>
            <form onSubmit={forgetPassword}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-greenDDTV hover:bg-green-800 text-white font-bold rounded-lg py-2 px-4 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loading ? <Loading message="Chargement" /> : "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default forgetPassword;
