import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useContext } from "react";
import { ThemeProvider } from "next-themes";
import Navigation from "../components/Navigation";
import { authUserContext } from "../components/AuthUserProvider";

export const useAuth = () => useContext(authUserContext);
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
