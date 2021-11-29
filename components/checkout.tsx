import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
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
            className={`bg-gray-900 p-2 rounded-lg text-white font-bold pl-6 pr-6 transition hover:bg-gray-800 ${
              error && "bg-red-500 hover:bg-red-600"
            }`}
            type="submit"
            disabled={!stripe}
          >
            {loading ? (
              <Loading message="Chargement..." />
            ) : error ? (
              <p className="text-medium text-sm">{error}</p>
            ) : (
              "Payer"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
