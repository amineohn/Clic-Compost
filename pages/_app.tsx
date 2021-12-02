import "../styles/globals.css";
import "nprogress/nprogress.css";

import React, { useEffect } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useRouter } from "next/router";
import { Firebase } from "../libs/firebase";
import { NextSeo } from "next-seo";
import { Router } from "next/router";
import NProgress from "nprogress";

const Navigation = dynamic(() => import("../components/navigation"), {
  ssr: false,
});
const fire = new Firebase();
const isAvailable = Capacitor.isPluginAvailable("StatusBar");
const isAvailable2 = Capacitor.isPluginAvailable("SplashScreen");
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
    if (!fire.getUser()) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <NextSeo
        title="Clic Compost | Login"
        description=""
        openGraph={{
          url: "https://les-detritivores.co",
          title: "Clic Compost",
          description: "",
          images: [
            {
              url: "/static/images/logos.jpg",
              width: 800,
              height: 600,
              alt: "Les Détritivores",
            },
          ],
        }}
      />
      <div className="flex flex-col h-screen overflow-auto lg:overflow-y-hidden justify-between z-auto">
        <Component {...pageProps} />
        <Navigation />
      </div>
      <script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js" />
    </>
  );
}
