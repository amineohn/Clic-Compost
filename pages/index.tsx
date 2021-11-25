import type { NextPage } from "next";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import fb from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Link from "next/link";
const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  fb.auth().onAuthStateChanged((user) => {
    if (user) {
      router.push("/collect");
    }
  });
  // authenticate user with google
  const authenticateWithGoogle = async () => {
    try {
      setLoading(true);
      await fb.auth().signInWithPopup(provider);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

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
      const user = await signInWithEmailAndPassword(auth, email, password);
      /* await fb.firestore().collection("users").doc(user.user.uid).set({
        id: user.user.uid,
        email: email,
        password: password,
      }); */
      //setLoading(false);
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
          errorMessage = "Une erreur inconnue s'est produite.";
          break;
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  return (
    <>
      <FadeIn className="lg:my-60 my-30">
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
                    Vous êtes connecté
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
                <Link href="/account/password">
                  <a className="inline-block align-baseline font-bold text-sm text-greenDDTV hover:text-green-800 ml-2">
                    Mot de passe oublié?
                  </a>
                </Link>
              </div>
            </form>

            <div className="mt-5 flex">
              <button
                className="flex bg-greenDDTV hover:bg-green-800 text-white font-normal py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() => authenticateWithGoogle()}
              >
                <svg
                  className="h-4 w-4 mr-2 mt-1 fill-current !text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
                Connexion avec Google
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Home;
