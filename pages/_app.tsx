import "../styles/globals.css";
import React, { useContext, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import fb from "firebase/compat/app";

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
if (fb.apps.length) {
  console.log("firebase is connected");
}
const isAvailable = Capacitor.isPluginAvailable("StatusBar");
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  const { authUser }: any = useContext(authUserContext);
  const { theme } = useTheme();

  if (Capacitor.isPluginAvailable("StatusBar")) {
    if (!isAvailable) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#ffffff" });
    }
  }
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
