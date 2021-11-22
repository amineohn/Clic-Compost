import type { NextPage } from "next";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const Home: NextPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = (formData) => {
    let emailError = "";
    let passwordError = "";
    if (!formData.email) {
      emailError = "Email is required";
    }
    if (!formData.password) {
      passwordError = "Password is required";
    }
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }
    return true;
  };
  const auth = getAuth();
  let token = auth.currentUser?.getIdToken() as any;
  signInWithCustomToken(auth, token)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      user.getIdToken(true).then((idToken) => {
        if (idToken) {
          token = idToken;
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/argument-error") {
        console.log("Invalid token");
      }
      if (errorMessage) {
        console.log(errorMessage);
      }
    });
  const handleChange = (e) => {
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <FadeIn className="my-48">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center">
            <form
              onSubmit={(e) => {
                handleChange(e);
                if (validate(formData)) {
                  setIsSubmitting(true);
                }
                e.preventDefault();
                setIsSubmitting(true);
                setErrors({ email: "", password: "" });
                const errors = validate(formData);
                setIsSubmitting(false);
                setErrors({
                  email: formData.email,
                  password: formData.password,
                });
              }}
            >
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-greenDDTV hover:text-green-800"
                  href="#"
                >
                  Forgot Password?
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
