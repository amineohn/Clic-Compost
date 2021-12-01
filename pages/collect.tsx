import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "../components/loading";
import { form } from "../utils/regex";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../components/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Firebase } from "../libs/firebase";
import { NextSeo } from "next-seo";
import router from "next/router";
const Collect: NextPage = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("");
  const [collectTime, setCollectTime] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([{}]);
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  const fire = new Firebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    setSuccess(false);
    if (!phone || !name || !email || !frequency || !collectTime || !address) {
      setError("Veuillez remplir tous les champs");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }
    if (!phone.match(form.send.phone)) {
      setError("Veuillez entrer un numéro de téléphone valide");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }
    if (!email.match(form.send.email)) {
      setError("Veuillez entrer un email valide");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }
    if (!collectTime.match(form.send.collectTime)) {
      setError("Veuillez entrer une heure de collecte valide");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }
    if (!address.match(form.send.address)) {
      setError("s'il-vous-plaît entrez une adresse valide");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }

    setError("");
    setSuccess(false);
    const data = {
      id: fire.getCollection("clients").doc().id,
      phone: phone,
      name: name,
      email: email,
      frequency: frequency,
      collectTime: collectTime,
      address: address,
    };
    try {
      fire.getCollection("clients").add(data);
      setLoading(false);
      setSuccess(true);
      router.reload();
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  };
  const clear = () => {
    setPhone("");
    setName("");
    setEmail("");
    setFrequency("");
    setCollectTime("");
    setAddress("");
    setError("");
    setLoading(false);
    setSuccess(false);
  };

  useEffect(() => {
    fire.getCollection("clients").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        const name = data.name;
        const address = data.address;
        const phone = data.phone;
        const collectTime = data.collectTime;
        const frequency = data.frequency;
        const date = data.date;
        setData((prev) => [
          ...prev,
          {
            id,
            name,
            address,
            phone,
            collectTime,
            frequency,
            date,
          },
        ]);
      });
    });
    if (data.length === 0) {
      setLoading(true);
    }
  }, []);

  return (
    <>
      <NextSeo
        title="Clic Compost | Collect"
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
      <FadeIn className="grid m-auto grid-cols-1 lg:grid-cols-3 justify-center my-36 lg:my-36">
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <form
              className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Nom du site
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Nom du site"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Adresse
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Adresse"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Téléphone
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  <input
                    type="time"
                    value={collectTime}
                    autoComplete="off"
                    onChange={(e) => setCollectTime(e.target.value)}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
                  />
                </label>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Fréquence
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Fréquence"
                  value={frequency}
                  list="frequency"
                  autoComplete="off"
                  onChange={(e) => setFrequency(e.target.value)}
                />
                <datalist id="frequency">
                  <option id="frequency">1</option>
                  <option id="frequency">2</option>
                  <option id="frequency">3</option>
                  <option id="frequency">4</option>
                  <option id="frequency">5</option>
                  <option id="frequency">Tout les jours</option>
                </datalist>
              </div>

              <div className="flex items-center justify-between space-x-10">
                <button
                  className="py-2 px-2 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="button"
                  onClick={() => {
                    clear();
                  }}
                >
                  Effacer
                </button>
                <button
                  className={`py-2 px-2 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                    error &&
                    "bg-red-600 hover:bg-red-700 focus:!ring-red-500 focus:!ring-offset-red-200 font-medium !text-xs ml-0.5 py-3 px-2 rounded-lg"
                  }${success && "bg-green-500 hover:bg-green-600"}`}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loading message="Chargement" />
                    </>
                  ) : (
                    <>
                      {error ? (
                        <FadeIn>{error}</FadeIn>
                      ) : success ? (
                        <FadeIn>
                          <span>Collecte ajouter :)</span>
                        </FadeIn>
                      ) : (
                        "Ajouter"
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
              <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:-mb-8 sm:-mt-6 sm:flex sm:justify-start">
                  <div className="align-middle inline-block min-w-full border-b border-gray-200 dark:border-gray-800">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Nom du site
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Adresse
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Téléphone
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Créneau
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Fréquence
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data ? (
                          data.map((item: any, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500">
                                      {item.address}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.address}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.phone}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.collectTime}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.frequency}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="flex space-x-1 justify-center p-4 m-auto">
                            <svg
                              className="animate-spin h-4 w-4 text-gray-900 mt-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Chargement des datas..</span>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 lg:w-96 w-72">
            <div className="flex flex-col">
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </div>
          </div>
        </div>
        {data.length !== 0 && (
          <>
            <FadeIn>
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
                <div className="flex items-center justify-center w-12 bg-greenDDTV">
                  <svg
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-greenDDTV dark:text-greenDDTV">
                      Attention
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      Aucune collecte n'as été crée.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </>
        )}
      </FadeIn>
    </>
  );
};

export default Collect;
