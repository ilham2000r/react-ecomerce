import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store"
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QIPkWClJYTUZIb8Rm9BGKKxCG60QrLfa3dHEOPnnV1DDEsWpaFcGIE1JFFaUb2KVET2eVNeafBm87mo8W1masJL002uyqIzuG");
const Payment = () => {
    const token = useEcomStore((state)=>state.token)
    const [clientSecret, setClientSecret] = useState("")

    useEffect(()=>{
        payment(token)
        .then((res)=>{
            console.log(res);
            setClientSecret(res.data.clientSecret)
            
        })
        .catch((err)=>{
            console.log('err',err);
            
        })
    },[])

    const appearance = {
        theme: 'stripe',
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = 'auto';

  return (
    <div>
        {
            clientSecret && (
                <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )
        }
    </div>
  )
}

export default Payment