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
  apiKey: "AIzaSyAeuEJ6aYJRE1JHzRJgabAAF95MzAGmPic",
  authDomain: "clic-compostnew.firebaseapp.com",
  projectId: "clic-compostnew",
  storageBucket: "clic-compostnew.appspot.com",
  messagingSenderId: "553724034700",
  appId: "1:553724034700:web:0a0b6f732410eb6f6945a9",
  measurementId: "G-BR78123BPV",
};

fb.initializeApp(config);

console.log("firebase is connected");
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
    <>
      <ThemeProvider defaultTheme="light" attribute="class">
        <authUserContext.Provider value={authUser}>
          <div className="flex flex-col h-screen justify-between">
            <Component {...pageProps} />
            <Navigation />
          </div>
        </authUserContext.Provider>
      </ThemeProvider>
      <script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js" />
    </>
  );
}
export const useAuth = () => useContext(authUserContext);
