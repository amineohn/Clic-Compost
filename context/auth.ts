import { useState, useEffect } from "react";
import fb from "firebase/compat/app";
// language=TypeScript
export default async function authentification() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = fb.auth();
  const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email,
  });

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };
  async function signUp(email, password) {
    await auth.createUserWithEmailAndPassword(email, password);
    setLoading(false);
  }
  async function signIn(email, password) {
    await auth.signInWithEmailAndPassword(email, password);
    setLoading(false);
  }
  async function signOut() {
    await auth.signOut();
    setLoading(false);
    clear();
  }

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
    return () => {
      auth.onAuthStateChanged(() => {
        clear(); //?? must be clear or onAuthStateChangedAsync? or onAuthStateChanged?
        onAuthStateChanged(null);
        onAuthStateChangedAsync(null);
      });
    };
  }, []);
  return {
    authUser,
    loading,
    clear,
    onAuthStateChanged: onAuthStateChangedAsync,
    signUp,
    signIn,
    signOut,
  };
}
