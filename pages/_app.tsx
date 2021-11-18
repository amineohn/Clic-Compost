import "../styles/globals.css";
import React, { useContext } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import { authUserContext } from "../components/AuthUserProvider";
import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});
function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export const useAuth = () => useContext(authUserContext);
export default MyApp;
