import { useState, useEffect } from "react";
import Auth, { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default async function authentification() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const firebaseConfig = {
    apiKey: "AIzaSyD_8go5RZ0kTpp19ZUkiVFGeTUC8fvYDWs",
    authDomain: "clickncompost.firebaseapp.com",
    projectId: "clickncompost",
    storageBucket: "clickncompost.appspot.com",
    messagingSenderId: "1020295512270",
    appId: "1:1020295512270:web:707f016bc4c0a310afd09f",
    measurementId: "G-R7P9BDSQJD",
  };
  await initializeApp(firebaseConfig);

  const signInWithEmailAndPassword = async (email: string, password: string) =>
    await Auth.signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => await Auth.createUserWithEmailAndPassword(auth, email, password);

  const signOut = async () => await Auth.signOut(auth).then();

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser: any = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(auth, authStateChanged);
    return unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
