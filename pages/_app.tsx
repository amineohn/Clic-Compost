import "../styles/globals.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import fb from "firebase/compat/app";
import { useRouter } from "next/router";
import { Firebase } from "../libs/firebase";
const Navigation = dynamic(() => import("../components/navigation"), {
  ssr: false,
});
const fire = new Firebase();

fire.Init();
const isAvailable = Capacitor.isPluginAvailable("StatusBar");
const isAvailable2 = Capacitor.isPluginAvailable("SplashScreen");
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    if (!isAvailable) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#ffffff" });
    }
  }
  if (Capacitor.isPluginAvailable("SplashScreen")) {
    if (!isAvailable2) {
      SplashScreen.hide();
    }
  }
  const router = useRouter();

  useEffect(() => {
    if (!fb.auth().currentUser) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <ThemeProvider defaultTheme="light" attribute="class">
        <div className="flex flex-col h-screen overflow-auto lg:overflow-y-hidden justify-between z-auto">
          <Component {...pageProps} />
          <Navigation />
        </div>
      </ThemeProvider>
      <script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js" />
    </>
  );
}
