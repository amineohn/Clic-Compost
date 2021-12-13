import { NextSeo } from "next-seo";
import React from "react";
import FadeIn from "react-fade-in";
import Navigation from "../../components/navigation";
import Sidebar from "../../components/sidebar";
import { Firebase } from "../../libs/firebase";
const Home = () => {
  const fire = new Firebase();
  return (
    <>
      <NextSeo
        title="Clic Compost | Dashboard"
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
      <Navigation />
      <main className="flex w-full h-screen">
        <Sidebar />
        <FadeIn className="w-full p-4 rounded-tr rounded-br">
          <div className="w-full h-64 p-4 text-md">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, quisquam.
            </p>
            <div className="flex justify-between mt-4">
              <div className="w-1/2">
                <span className="text-gray-600">
                  <span className="font-bold">Total</span>
                  <span className="text-gray-500">
                    <span className="font-bold">Backlog</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
    </>
  );
};
export default Home;
