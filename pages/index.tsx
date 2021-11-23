import type { NextPage } from "next";
import React, { FormEvent, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fb from "firebase/compat/app";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    if (auth && auth.currentUser) {
      router.push("/collect");
    }
  });
  const setEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case "auth/invalid-custom-token":
          errorMessage =
            "The custom token format is incorrect. Please check the documentation.";
          break;
        case "auth/custom-token-mismatch":
          errorMessage =
            "The custom token corresponds to a different audience.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "The supplied auth credential is malformed or has expired.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Password sign-in is disabled for this project.";

          break;
        case "auth/user-disabled":
          errorMessage =
            "The user account has been disabled by an administrator.";
          break;
        case "auth/user-token-expired":
          errorMessage =
            "The user's credential is no longer valid. The user must sign in again.";
          break;
        case "auth/web-storage-unsupported":
          errorMessage = "The user's browser does not support web storage.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is badly formatted.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "There is no user record corresponding to this identifier.";
          break;
        case "auth/wrong-password":
          errorMessage =
            "The password is invalid or the user does not have a password.";
          break;

        default:
          console.log(errorMessage);
      }
      setError(errorMessage);
    }
    setLoading(false);

    try {
      const auth = await getAuth();
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        console.log(error);
      });
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

        setLoading(false);
      }
    } catch (error: any | string) {
      setError(error.message);
      setLoading(false);
    }
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={setEmailChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={setPasswordChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={(e: any) => handleSubmit(e)}
                >
                  Submit
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
