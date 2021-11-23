import { useState, useEffect } from "react";
import fb from "firebase/compat/app";
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});
// language=TypeScript
export default async function authentification() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = fb.auth();

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };
  async function onAuthStateChanged(user) {
    if (user) {
      setAuthUser(formatAuthUser(user) as any);
    } else {
      clear();
    }
    setLoading(false);
  }
  async function onAuthStateChangedAsync(user) {
    await setAuthUser(formatAuthUser(user) as any);
    await setLoading(false);
  }
  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
    if (fb?.apps?.length) {
      fb.initializeApp(firebase);
      fb.firestore();
    }
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChangedAsync);
    return () => {
      auth.onAuthStateChanged(() => {
        return null;
      });
      unsubscribe();
    };
  }, []);
  return {
    authUser,
    loading,
    clear,
    onAuthStateChanged: onAuthStateChangedAsync,
  };
}
export const firebase = {
  apiKey: "AIzaSyAl5HVmCYHREKk_I3O3eoXFAGktH9DhBhE",
  //apiKey: "AIzaSyD_8go5RZ0kTpp19ZUkiVFGeTUC8fvYDWs",
  authDomain: "clickncompost.firebaseapp.com",
  projectId: "clickncompost",
  storageBucket: "clickncompost.appspot.com",
  messagingSenderId: "1020295512270",
  appId: "1:1020295512270:web:707f016bc4c0a310afd09f",
  measurementId: "G-R7P9BDSQJD",
};
