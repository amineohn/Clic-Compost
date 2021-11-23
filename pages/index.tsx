import type { NextPage } from "next";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import fb from "firebase/compat/app";
const Home: NextPage = () => {
  const isEmpty = (value: string) => {
    return value === "";
  };
  const [formData, setFormData] = useState({
    email: isEmpty(getAuth().currentUser?.email as any)
      ? ""
      : getAuth().currentUser?.email,
    password: isEmpty(getAuth().currentUser as any) ? "" : "",
  });
  const [errors, setErrors] = useState({
    email: isEmpty(getAuth().currentUser?.email as any)
      ? ""
      : getAuth().currentUser?.email,
    password: isEmpty(getAuth().currentUser as any) ? "" : "",
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
    if (formData.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }
    if (formData.email.length < 6) {
      emailError = "Email must be at least 6 characters";
    }
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }
    fb.firestore()
      .collection("users")
      .doc(formData.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data()?.password === formData.password) {
            signInWithCustomToken(auth, doc.data()?.token);
          } else {
            setErrors({ email: "", password: "Wrong password" });
          }
        } else {
          setErrors({ email: "", password: "User not found" });
        }
      });

    return true;
  };
  const auth = getAuth();

  let token = auth.currentUser?.getIdToken() as any;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      signInWithCustomToken(auth, token).then(() => {
        console.log("signed in");
      });
    }
  };
  auth.onAuthStateChanged((user) =>
    user
      ? console.log("signed in \n email: \n" + user.email)
      : console.log("signed out")
  );

  signInWithCustomToken(auth, token)
    .then((userCredential) => {
      // Signed in
      if (userCredential.user) {
        console.log(userCredential.user);
      }

      const user = userCredential.user;
      console.log(user);
      user.getIdToken(true).then((idToken) => {
        if (idToken) {
          token = idToken;
        }
      });

      //signInWithCustomToken(auth, token); // we need to test it?
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case "auth/invalid-custom-token":
          console.log(
            "The custom token format is incorrect. Please check the documentation."
          );
          break;
        case "auth/custom-token-mismatch":
          console.log("The custom token corresponds to a different audience.");
          break;
        case "auth/invalid-credential":
          console.log(
            "The supplied auth credential is malformed or has expired."
          );
          break;
        case "auth/operation-not-allowed":
          console.log("Password sign-in is disabled for this project.");
          break;
        case "auth/user-disabled":
          console.log(
            "The user account has been disabled by an administrator."
          );
          break;
        case "auth/user-token-expired":
          console.log(
            "The user's credential is no longer valid. The user must sign in again."
          );
          break;
        case "auth/web-storage-unsupported":
          console.log("The user's browser does not support web storage.");
          break;
        case "auth/invalid-email":
          console.log("The email address is badly formatted.");
          break;
        case "auth/user-not-found":
          console.log(
            "There is no user record corresponding to this identifier."
          );
          break;
        case "auth/wrong-password":
          console.log(
            "The password is invalid or the user does not have a password."
          );
          break;

        default:
          console.log(errorMessage);
      }

      if (errorMessage) {
        console.log(errorMessage);
      }
    });
  // firebase has been initialized in the client side code
  // so we can use it here

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
                  value={formData.email as string}
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
                  onClick={(e) => handleSubmit(e)}
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
