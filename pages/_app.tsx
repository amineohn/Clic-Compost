import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useContext } from "react";
import { ThemeProvider } from "next-themes";
import Navigation from "../components/Navigation";
import { createContext } from "react";
import useFirebaseAuth from "../context/auth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  //signInWithEmailAndPassword: async () => {},
  //createUserWithEmailAndPassword: async () => {},
  //signOut: async () => {},
});
export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
export const useAuth = () => useContext(authUserContext);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserProvider>
  );
}
export default MyApp;
