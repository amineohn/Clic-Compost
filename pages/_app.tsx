import "../styles/globals.css";
import React, { useContext, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import fb from "firebase/compat/app";
// an error occured during hydration
// @ts-ignore

import { authUserContext } from "../components/AuthUserProvider";

const Navigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});
const config = {
  apiKey: "AIzaSyD_8go5RZ0kTpp19ZUkiVFGeTUC8fvYDWs",
  authDomain: "clickncompost.firebaseapp.com",
  projectId: "clickncompost",
  storageBucket: "clickncompost.appspot.com",
  messagingSenderId: "1020295512270",
  appId: "1:1020295512270:web:707f016bc4c0a310afd09f",
  measurementId: "G-R7P9BDSQJD",
};

fb.initializeApp(config);
console.log("firebase connected");
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  const { authUser }: any = useContext(authUserContext);
  const { theme } = useTheme();
  useEffect(() => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      StatusBar.setStyle({ style: Style.Dark });
    }
    if (Capacitor.isPluginAvailable("SplashScreen")) {
      SplashScreen.hide();
    }
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
      //StatusBar.setOverlaysWebView({ overlay: true });
      if (theme === "dark") {
        StatusBar.setStyle({
          style: Style.Dark,
        });
        StatusBar.setBackgroundColor({ color: "#fff" });
      } else {
        StatusBar.setStyle({
          style: Style.Light,
        });
        StatusBar.setBackgroundColor({ color: "#000" });
      }
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <authUserContext.Provider value={authUser}>
        <div className="flex flex-col h-screen justify-between">
          <Component {...pageProps} />
          <Navigation />
        </div>
      </authUserContext.Provider>
    </ThemeProvider>
  );
}
export const useAuth = () => useContext(authUserContext);
