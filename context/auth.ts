import { useState, useEffect } from "react";
import Auth, { getAuth } from "@firebase/auth";
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function authentification() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const signInWithEmailAndPassword = (email: string, password: string) =>
    Auth.signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    Auth.createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => Auth.signOut(auth).then();

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
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
