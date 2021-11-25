import { getAuth } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import fb from "firebase/compat/app";
import "firebase/compat/auth";
const Tickets: NextPage = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {});

  const [ticket, setTicket] = useState({
    name: "",
    expire: "",
    crypt: "",
  });
  const ticketsList = [
    {
      name: "John Doe",
      email: "test2",
      phone: "test2",
      timeCollect: "test2",
      frequency: ["daily" || "weekly" || "monthly"], // daily, weekly, monthly
      adress: "test2",
    },
    {
      name: "John Doe",
      email: "test2",
      phone: "test2",
      timeCollect: "test2",
      frequency: ["daily" || "weekly" || "monthly"], // daily, weekly, monthly
      adress: "test2",
    },
    {
      name: "John Doe",
      email: "test2",
      phone: "test2",
      timeCollect: "test2",
      frequency: ["daily" || "weekly" || "monthly"], // daily, weekly, monthly
      adress: "test2",
    },
    {
      name: "John Doe",
      email: "test2",
      phone: "test2",
      timeCollect: "test2",
      frequency: ["daily" || "weekly" || "monthly"], // daily, weekly, monthly
      adress: "test2",
    },
  ];
  // login form to be displayed on the page with the ticket form and the tickets list of tickets
  return (
    <>
      {error && <div>{error}</div>}
      <FadeIn className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 my-36">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center">
                  Saisie des données banquaire
                </h1>
              </div>
              <div className="mb-4">
                <form
                  className="w-full max-w-lg"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(ticket);
                  }}
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Numéro de carte
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-first-name"
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        onChange={(e) =>
                          setTicket({ ...ticket, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Expiration
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="date"
                        placeholder=""
                        onChange={(e) =>
                          setTicket({ ...ticket, expire: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Cryptogramme visuel
                      </label>
                      <input
                        className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        placeholder=""
                        onChange={(e) =>
                          setTicket({ ...ticket, crypt: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <button
                        className="bg-greenDDTV hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                          console.log(ticket);
                        }}
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center">
                  Liste des tickets
                </h1>
              </div>
              <div className="mb-4 overflow-auto">
                <table className="max-w-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Nom du site</th>
                      <th className="px-4 py-2">Adresse</th>
                      <th className="px-4 py-2">Téléphone</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Crénau de collecte</th>
                      <th className="px-4 py-2">Fréquence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketsList.map((ticket) => (
                      <tr key={ticket.name}>
                        <td className="border px-4 py-2">{ticket.name}</td>
                        <td className="border px-4 py-2">{ticket.email}</td>
                        <td className="border px-4 py-2">{ticket.phone}</td>
                        <td className="border px-4 py-2">{ticket.adress}</td>
                        <td className="border px-4 py-2">
                          {ticket.timeCollect}
                        </td>
                        <td className="border px-4 py-2">{ticket.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Tickets;
