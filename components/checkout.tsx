import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "./loading";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    if (stripe == null) {
      return;
    }
    setLoading(true);
    const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setLoading(false);
    }
    if (paymentMethod) {
      console.log("[paymentMethod]", paymentMethod);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <CardElement />
        <div className="flex justify-end space-x-2">
          <button
            className={`py-2 px-2 flex justify-center items-center bg-greenDDTV hover:bg-green-800 focus:ring-green-800 focus:ring-offset-green-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
              error &&
              "bg-red-600 hover:bg-red-700 focus:!ring-red-500 focus:!ring-offset-red-200"
            }`}
            type="submit"
            disabled={!stripe}
          >
            {loading ? (
              <Loading message="Chargement..." />
            ) : (
              <>
                <div className="inline-flex space-x-1">
                  <span className="text-white">Payer</span>
                  <span className="text-white">{`${(9.99).toFixed(2)}€`}</span>
                </div>
              </>
            )}
          </button>
        </div>
        {error && (
          <FadeIn className="mb-2">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-12 bg-red-500 flex-col">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>

              <div className="px-4 py-2 pb-5 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-red-500 dark:text-red-400">
                    Erreur
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    <a onClick={() => setError(null)}>{error}</a>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </form>
    </>
  );
};

export default Checkout;
