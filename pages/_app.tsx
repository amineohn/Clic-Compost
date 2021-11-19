import "../styles/globals.css";
import React, { useContext } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import { authUserContext } from "../components/AuthUserProvider";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { Toast } from "@capacitor/toast";

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
      text: "this app is under developpement.",
    });

    SplashScreen.hide();
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({
      style: Style.Dark,
    });
  } else {
  }
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export const useAuth = () => useContext(authUserContext);
