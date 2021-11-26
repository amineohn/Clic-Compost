import React, { useState } from "react";
import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";

// form signup page for user signup with tailwindcss and react TypeScript
const signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Le mot de passe doit être au moins de 6 caractères");
      return;
    }
    // register({ name, email, password });
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
      await fb.firestore().collection("users").add({
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
      await fb
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((doc) => {
          if (doc.size > 0) {
            setError("Cet email est déjà utilisé");
            return;
          }
        });
    } catch (error) {
      console.log(error);
    }
    try {
      await fb.auth().createUserWithEmailAndPassword(email, password);
      await fb.auth().currentUser?.updateProfile({
        displayName: name,
      });
      setError("Inscription réussie");
    } catch (error: any) {
      setError(error.message);
    }
    setSuccess(true);

    if (!name || !email || !password) {
      setError("Veuillez saisir tous les champs");
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setError("Veuillez entrer un email valide");
    }
    if (success) {
      setSuccess(false);
    }
    if (error) {
      setError("");
    }
  };

  return (
    <FadeIn className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          {error && (
            <FadeIn className="bg-red-100 border border-red-100 text-red-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <p className="text-red-500 text-xs italic">{error}</p>
            </FadeIn>
          )}
          {success && (
            <FadeIn className="bg-green-100 border border-green-100 text-green-700 px-4 py-3 rounded-lg relative space-y-2 overflow-auto">
              <p className="text-green-500 text-xs italic">
                Inscription réussie
              </p>
            </FadeIn>
          )}

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
