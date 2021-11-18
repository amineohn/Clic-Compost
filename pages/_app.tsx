import "../styles/globals.css";
import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import { hydrate } from "react-dom";
import dynamic from "next/dynamic";
import { authUserContext } from "../components/AuthUserProvider";
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
  useEffect(() => {
    if (process.browser) {
      document.getElementById("__next");
    }
  });

  if (typeof window !== "undefined") {
    return hydrate(
      <>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <Navigation />
          <Component {...pageProps} />
        </ThemeProvider>
      </>,
      document.getElementById("__next") as Element
    );
  }
}
export const useAuth = () => useContext(authUserContext);
export default MyApp;
