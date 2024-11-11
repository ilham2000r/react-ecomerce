import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../Stripe.css'
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function CheckoutForm() {
  const stripe = useStripe();
  const navigate = useNavigate()
  const elements = useElements();
  
  const token = useEcomStore((state)=>state.token)
  const clearCart = useEcomStore((state)=>state.clearCart)


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    console.log('payload',payload);
    
    if (payload.error) {
      setMessage(payload.error.message);
      console.log('err');
      toast.error(payload.error.message)
    }
    else if (payload.paymentIntent.status ==="succeeded") {
      console.log('Ready or Saveorder');
        saveOrder(token, payload)
        .then((res)=>{
          console.log(res)
          clearCart()
          toast.success('Payment Succeeded')
          navigate('/user/history')

        })
        .catch((err)=>{
            console.log('err',err);
        })
      
    } 
    else {
      console.log('Something wrong');
      toast.warning('Payment Error')
      

    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
            className="stripe-button mt-4"
            disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      
    </>
  );
}