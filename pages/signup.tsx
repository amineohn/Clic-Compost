import React, { useState } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";
import { Transition } from "@headlessui/react";
import { Firebase } from "../libs/firebase";

const signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const fire = new Firebase();
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Le mot de passe doit être au moins de 6 caractères");
      return;
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setError("L'email doit être valide");
      return;
    }
    try {
      await fire.getCollection("users").add({
        name,
        email,
        password,
      });
      setSuccess(true);
      setError("");
      return;
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
      //return;
    }

    try {
      await fire
        .getCollection("users")
        .where("email", "==", email)
        .get()
        .then((doc) => {
          if (doc.size > 0) {
            setInterval(() => {
              setError("");
            }, 3500);

            setError("Cet email est déjà utilisé");
            return;
          }
        });
    } catch (error) {
      console.log(error);
    }
    try {
      await fire.signUp(email, password);
      await fire.getAuth().currentUser?.updateProfile({
        displayName: name,
      });
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Inscription réussie");
    } catch (error: any) {
      setError(error.message);
    }
    setSuccess(true);

    if (!name || !email || !password) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Veuillez saisir tous les champs");
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Veuillez entrer un email valide");
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
  // svg close button grid item

  return (
    <FadeIn className="lg:my-60 my-60 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
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
          <Transition
            show={success}
            enter="transition-opacity duration-75"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-150"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div className="bg-green-100 border border-green-100 text-green-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <p className="text-green-500 text-xs italic">
                Inscription réussie
              </p>
            </div>
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
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </FadeIn>
  );
};
export default signup;
