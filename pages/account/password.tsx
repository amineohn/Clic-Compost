import type { NextPage } from "next";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import fb from "firebase/compat/app";
import Loading from "../../components/Loading";
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
      <FadeIn className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xs space-y-2">
          {error && (
            <FadeIn className="bg-red-100 border border-red-100 text-red-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <strong className="font-bold">Erreur</strong>
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </FadeIn>
          )}

          {success && (
            <FadeIn className="bg-green-100 border border-green-100 text-green-700 px-4 py-3 rounded-lg relative space-y-2">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                Nous vous avons envoyé un e-mail pour réinitialiser votre mot de
                passe.
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
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
