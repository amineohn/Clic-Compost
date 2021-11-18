import { createContext } from "react";
import useFirebaseAuth from "../context/auth";
export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider
      value={{
        authUser: null,
        loading: true,
        signInWithEmailAndPassword: async () => {},
        createUserWithEmailAndPassword: async () => {},
        signOut: async () => {},
      }}
    >
      {children}
    </authUserContext.Provider>
  );
}

export const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});
