import React, { FormEvent, useState } from "react";
import type { NextPage } from "next";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";
import { Transition } from "@headlessui/react";
import { Firebase } from "../libs/firebase";
import router from "next/router";
import { NextSeo } from "next-seo";
import { Validate } from "../libs/validate";
import { Logo } from "../components/logo";

const signup: NextPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const fire = new Firebase();
  const check = new Validate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fire.signUp(email, password);
      await fire.user()?.updateProfile({
        displayName: name,
      });
      setInterval(() => {
        setError("");
      }, 3500);

      setSuccess(true);
      router.push("/collect");
    } catch (error: any) {
      const messages = check.errors(error.code, error.message);
      setError(messages);
    }
    if (password.length < 6) {
      setError("Le mot de passe doit être au moins de 6 caractères");
      return;
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    try {
      await fire.collection("users").add({
        name,
        email,
        password,
      });
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    }
    if (!name || !email || !password) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Veuillez saisir tous les champs");
    }
    if (!check.name(name)) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Le nom doit contenir au moins 2 caractères");
    }

    if (!check.email(email)) {
      setError("Veuillez entrer un email valide");
      setInterval(() => {
        setError("");
      }, 3500);
      return;
    }

    if (!check.password(password)) {
      setError(
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
      );
      setInterval(() => {
        setError("");
      }, 3500);
      return;
    }
    if (success) {
      setSuccess(false);
    }
    if (error) {
      setError("");
    }
    if (password.length < 6) {
      setInterval(() => {
        setError("");
      }, 3500);

      setError("Le mot de passe doit être au moins de 6 caractères");
      return;
    }
  };
  const clear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setError("");
    setSuccess(false);
  };
  return (
    <>
      <NextSeo
        title="Clic Compost | SignUp"
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
      <FadeIn className="lg:my-60 my-60 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <Logo error={error} success={success} />
        </div>
        <div className="w-full max-w-xs">
          {error && (
            <FadeIn className="mb-2">
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-red-500 flex-col">
                  <svg
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                  </svg>
                  <span
                    onClick={() => clear()}
                    className="text-white text-xs cursor-pointer font-medium"
                  >
                    Vider
                  </span>
                </div>

                <div className="px-4 py-2 pb-5 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-red-500 dark:text-red-400">
                      Erreur
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <Transition
              show={success}
              enter="transition-opacity duration-75"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-150"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <FadeIn className="bg-green-500 border border-green-100 text-white px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
                <div className="flex justify-end space-x-2">
                  <div className="inline-flex justify-center space-x-2">
                    <div className="flex">
                      <p className="text-white text-xs font-medium">
                        Inscription réussie
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 mt-0.5 bg-green-600 p-1 rounded-full">
                    <svg
                      className="fill-current cursor-pointer text-green-100 hover:text-green-200 transition w-2 h-2 flex justify-items-end"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setSuccess(false)}
                    >
                      <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                  </div>
                </div>
              </FadeIn>
            </Transition>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Nom"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Mail
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Mail"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {password.length < 6 && (
                <p className="text-gray-600 text-xs italic">
                  Le mot de passe doit contenir au moins 6 caractères
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </>
  );
};
export default signup;
