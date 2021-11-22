// Path: components\AuthUserProvider.tsx
import { createContext } from "react";
import useFirebaseAuth from "../context/auth";
export async function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  // language=TypeScript
  return (
    <authUserContext.Provider
      value={{
        authUser: (await auth) ? auth : null,
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
export const authUserContext = createContext({});
