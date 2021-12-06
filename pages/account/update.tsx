import { NextSeo } from "next-seo";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "../../components/loading";
import { Firebase } from "../../libs/firebase";
import { Validate } from "../../libs/validate";
const Update = () => {
  const fire = new Firebase();
  const up = new Validate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    if (!name || !email || !password) {
      setError("Veillez remplir tous les champs");
      setLoading(false);
      return;
    }
    if (!up.email(email)) {
      setError("Veillez entrer un email valide");
      setLoading(false);
      return;
    }
    if (!up.password(password)) {
      setError("Veillez entrer un mot de passe valide");
      setLoading(false);
      return;
    }
    if (!up.name(name)) {
      setError("Veillez entrer un nom valide");
      setLoading(false);
      return;
    }

    setLoading(true);

    e.preventDefault();
    setLoading(true);
    try {
      await fire.updateUser(name as string, email as string, password);
      setSuccess("Votre profile à bien été mis à jour");
      setLoading(false);
    } catch (error: any) {
      const messages = up.errors(error.code, error.message);
      setError(messages);
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo
        title="Clic Compost | Update Profile"
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
      <FadeIn className="container-2xl">
        <div className="flex flex-col items-center justify-center h-screen mx-5">
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

          {success && (
            <FadeIn className="mb-2">
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {success}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
          {loading && <Loading message="Loading" />}

          <form
            className="w-full max-w-lg"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Nom
                </label>
                <input
                  className="transition appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-greenDDTV"
                  id="grid-first-name"
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={name as string}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setName("")}
                  className="text-greenDDTV text-xs font-medium hover:text-green-800 transition-all duration-200 ease-in-out"
                >
                  Supprimer le nom
                </button>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Email
                </label>
                <input
                  className="transition appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-greenDDTV"
                  id="grid-last-name"
                  type="text"
                  placeholder="anyway@youwant.com"
                  name="email"
                  value={email as string}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setEmail("")}
                  className="text-greenDDTV text-xs font-medium hover:text-green-800 transition-all duration-200 ease-in-out mt-2"
                >
                  Supprimer l'email
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="transition appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-greenDDTV"
                  id="grid-password"
                  type="password"
                  placeholder="*********"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setPassword("")}
                  className="text-greenDDTV text-xs font-medium hover:text-green-800 transition-all duration-200 ease-in-out"
                >
                  Supprimer le mot de passe
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="max-w-xs py-2 px-4 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </>
  );
};
export default Update;
