import type { NextPage } from "next";
import React, { FormEvent, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import fb from "firebase/compat/app";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  // if user is logged in, success will be true and we will redirect to /dashboard  page automatically

  if (auth && auth.currentUser) {
    router.push("/collect");
  }

  const setEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      // todo: connect with google auth for sign in
      const provider = new GoogleAuthProvider();

      // todo: make this connect user to firebase
      const user = await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      if (user) {
        await fb
          .firestore()
          .collection("users")
          .doc(email as string)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (doc.data()?.password === password) {
                signInWithEmailAndPassword(auth, email, password);
              } else {
                setError("Wrong password");
              }
            } else {
              setError("User not found");
            }
          });
        setSuccess(true);
        setLoading(false);
      }
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case "auth/invalid-custom-token":
          errorMessage =
            "Le format de jeton personnalisé est incorrect. Veuillez vérifier la documentation.";
          break;
        case "auth/custom-token-mismatch":
          errorMessage =
            "Le jeton personnalisé correspond à une audience différente.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "Les informations d'authentification fournies sont mal formées ou ont expiré.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "La connexion par mot de passe est désactivée pour ce projet.";

          break;
        case "auth/user-disabled":
          errorMessage =
            "Le compte utilisateur a été désactivé par un administrateur.";
          break;
        case "auth/user-token-expired":
          errorMessage =
            "Les informations d'identification de l'utilisateur ne sont plus valides. L'utilisateur doit se reconnecter.";
          break;
        case "auth/web-storage-unsupported":
          errorMessage =
            "Le navigateur de l'utilisateur ne prend pas en charge le stockage Web.";
          break;
        case "auth/invalid-email":
          errorMessage = "L'adresse e-mail n'est pas valide.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "Il n'y a pas d'enregistrement utilisateur correspondant à cet identifiant.";
          break;
        case "auth/wrong-password":
          errorMessage =
            "Le mot de passe est invalide ou l'utilisateur n'a pas de mot de passe.";
          break;

        default:
          console.log(errorMessage);
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  return (
    <>
      <FadeIn className="my-60">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center">
            <form method="POST">
              {error && (
                <FadeIn>
                  <div className="text-red-500 font-medium">{error}</div>
                </FadeIn>
              )}
              {success && (
                <FadeIn>
                  <div className="text-green-500 font-medium">
                    You are logged in
                  </div>
                </FadeIn>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Mail
                </label>
                <input
                  onChange={setEmailChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Mail"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  onChange={setPasswordChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className={
                    `bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline` +
                    (loading
                      ? "transition duration-100 animate-pulse cursor-not-allowed"
                      : "")
                  }
                  type="submit"
                  onClick={(e: any) => handleSubmit(e)}
                >
                  {loading ? (
                    <>
                      <Loading message="Chargement" />
                    </>
                  ) : (
                    "Connexion"
                  )}
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-greenDDTV hover:text-green-800 ml-2"
                  href="#"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Home;
