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
    }
    SplashScreen.hide();
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({
      style: Style.Default,
    });
  }
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="flex flex-col h-screen justify-between">
        <div className="my-28" /> <Component {...pageProps} />
        <Navigation />
      </div>
    </ThemeProvider>
  );
}
export const useAuth = () => useContext(authUserContext);
