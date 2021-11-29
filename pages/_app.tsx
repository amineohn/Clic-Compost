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

const Navigation = dynamic(() => import("../components/navigation"), {
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
  /*apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,*/
};

fb.initializeApp(config);
if (fb.apps.length) {
  console.log("firebase is connected");
}
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
        <div className="flex flex-col h-screen overflow-y-hidden justify-between z-auto">
          <Component {...pageProps} />
          <Navigation />
        </div>
      </ThemeProvider>
      <script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js" />
    </>
  );
}
