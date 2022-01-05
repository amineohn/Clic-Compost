import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";

import Loading from "../../components/loading";
import { Logo } from "../../components/logo";
import Navigation from "../../components/navigation";

import { Firebase } from "../../libs/firebase";
import { Validate } from "../../libs/validate";
const Reset: NextPage = () => {
  const [current, setCurrent] = useState("");
  const [newest, setNewest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fire = new Firebase();
  const up = new Validate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (current === "" || newest === "") {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
    }
    if (current.length < 6 || newest.length < 6) {
      setError("Votre mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
    }
    if (current === newest) {
      setError("Votre nouveau mot de passe doit être différent de l'ancien");
      setLoading(false);
    }
    if (!up.password(newest)) {
      setError(
        "Votre nouveau mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      );
      setLoading(false);
    }

    if (current !== "" && newest !== "" && current !== newest) {
      try {
        await fire.updatePassword(current, newest);
        setSuccess(true);
        if (success) {
          router.push("/");
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const messages = up.errors(error.code, error.message);
        setError(messages);
      }
    }

    if (success) {
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <NextSeo
        title="Clic Compost | Change Password"
        description=""
        openGraph={{
          url: "https://les-detritivores.co",
          title: "Clic Compost",
          description: "",
          images: [
            {
              url: "/static/images/logos.jpg",
              width: 800,
              height: 600,
              alt: "Les Détritivores",
            },
          ],
        }}
      />
      <Navigation />
      <FadeIn className="my-20">
        <div className="flex justify-center">
          <Logo error={error} success={success} />
        </div>
        <div className="w-full max-w-xs space-y-2">
          {error && (
            <FadeIn className="mb-2">
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800">
                <div className="flex items-center justify-center w-12 bg-red-500">
                  <svg
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 pb-5 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-red-500 dark:text-red-400">
                      Erreur
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-200">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {success && (
            <FadeIn className="mb-2">
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800">
                <div className="flex items-center justify-center w-12 bg-green-500">
                  <svg
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-green-500 dark:text-green-400">
                      Succès
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-200">
                      Mot de passe changer avec succès
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="text-center text-2xl font-bold">
                Changement de mot de passe
              </h1>
              <p className="text-center text-neutral-700 text-xs">
                Entrez votre nouveau mot de passe
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-neutral-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe Actuel
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-neutral-700 text-sm font-bold mb-2"
                  htmlFor="newest"
                >
                  Nouveau Mot de passe
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newest"
                  type="password"
                  placeholder="Nouveau Mot de passe"
                  value={newest}
                  onChange={(e) => setNewest(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="py-2 px-4 flex justify-center items-center bg-greenDTTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
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

export default Reset;
