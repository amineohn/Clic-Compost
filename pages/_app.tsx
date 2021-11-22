import "../styles/globals.css";
import React, { useContext } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { Toast } from "@capacitor/toast";
import { configuration } from "../configuration";
// an error occured during hydration
// @ts-ignore

import { authUserContext } from "../components/AuthUserProvider";

const Navigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  if (Capacitor.isNativePlatform()) {
    Toast.show({
      text: configuration.toast.text,
    });
    if (window.navigator.userAgent.includes("AndroidDarkMode")) {
      //test purpose
      StatusBar.setStyle({
        style: Style.Light,
      });
    } else {
      StatusBar.setStyle({
        style: Style.Dark,
      });
    }
    SplashScreen.hide();
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({
      style: Style.Default,
    });
  }
  const { authUser }: any = useContext(authUserContext);

  return (
    <ThemeProvider defaultTheme="default" attribute="class">
      <authUserContext.Provider value={authUser}>
        <div className="flex flex-col h-screen justify-between">
          <div className="my-28" />
          <Component {...pageProps} />
          <Navigation />
        </div>
      </authUserContext.Provider>
    </ThemeProvider>
  );
}
export const useAuth = () => useContext(authUserContext);
