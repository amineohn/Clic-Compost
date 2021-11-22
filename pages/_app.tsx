import "../styles/globals.css";
import React, { useContext } from "react";
import { ThemeProvider, useTheme } from "next-themes";
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
  const { authUser }: any = useContext(authUserContext);

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
export const useCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    Toast.show({
      text: configuration.toast.text,
    });
    const { theme } = useTheme();
    // language=TypeScript
    if ((await StatusBar.getInfo()).style !== "DARK" && theme === "dark") {
      //test purpose
      StatusBar.setStyle({
        style: Style.Light,
      });
    } else if (
      (await StatusBar.getInfo()).style !== "LIGHT" &&
      theme === "light"
    ) {
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
};
