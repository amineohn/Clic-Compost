import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
const Collect: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth || !auth.currentUser) {
      router.push("/");
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("");
  const [collectTime, setCollectTime] = useState("");
  const [address, setAddress] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setShowCollectModal(true);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);

        break;
      case "frequency":
        setFrequency(value);
        break;
      case "collectTime":
        setCollectTime(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  }
  const collects = [
    {
      id: 1,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 2,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 3,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,

      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 4,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 5,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 6,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
    {
      id: 7,
      name: "hellow you",
      price: "3000",
      image: "https://picsum.photos/200/300",
      address: "test anyway",
      description: "test2",
      isCollect: false,
      phone: "test3",
      schedule: "test5",
      frequency: "hello",
    },
  ];
  return (
    <>
      <FadeIn className="grid grid-cols-1 lg:grid-cols-2 justify-center my-28">
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
                  htmlFor="password"
                >
                  Créneau de collecte
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Créneau de collecte"
                  value={collectTime}
                  onChange={(e) => setCollectTime(e.target.value)}
                />
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
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Annuler
                </button>
                <button
                  className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    //addSite();
                  }}
                >
                  Ajouter
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
                  <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 dark:border-gray-800">
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
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {collects.map((collect) => (
                          <tr key={collect.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={collect.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm leading-5 font-medium text-gray-900">
                                    {collect.name}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500">
                                    {collect.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="text-sm leading-5 text-gray-900">
                                {collect.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="text-sm leading-5 text-gray-900">
                                {collect.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="text-sm leading-5 text-gray-900">
                                {collect.schedule}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="text-sm leading-5 text-gray-900">
                                {collect.frequency}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-800">
                              <div className="text-sm leading-5 text-gray-900">
                                <button
                                  onClick={() => setShowCollectModal(true)}
                                  className="transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:scale-105"
                                >
                                  <svg
                                    className="h-5 w-5 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Collect;
