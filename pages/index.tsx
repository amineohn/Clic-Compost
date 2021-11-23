import type { NextPage } from "next";
import React, { FormEvent, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fb from "firebase/compat/app";
import Loading from "../components/Loading";
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
      setError(error.message);
    }
    setLoading(false);

    try {
      const auth = await getAuth();
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-custom-token":
            console.log(
              "The custom token format is incorrect. Please check the documentation."
            );
            break;
          case "auth/custom-token-mismatch":
            console.log(
              "The custom token corresponds to a different audience."
            );
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

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <FadeIn className="my-60">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center">
            <form method="POST">
              {error && <div className="text-red-500 font-medium">{error}</div>}
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
