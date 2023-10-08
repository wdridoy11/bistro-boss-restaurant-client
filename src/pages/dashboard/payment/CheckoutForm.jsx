import React, { useState } from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { useEffect } from 'react';
import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContetxt } from '../../../context/AuthProvider';

const CheckoutForm = ({price}) => {

  const stripe = useStripe();
  const elements = useElements();
  const {user} = useContext(AuthContetxt)
  const [axiosSecure] = useAxiosSecure()
  const [cardError, setCardError]= useState(); 
  const [clientSecret, setClientSecret] = useState("");
  const [processing,setProcessing] = useState(false);
  const [transactionId,setTransactionId] = useState("");

  useEffect(()=>{
    console.log(price)
    axiosSecure.post(`/create-payment-intent`,{price})
    .then((res)=>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  },[])


  const handleSubmit= async(event)=>{
      event.preventDefault();
      if(!stripe || !elements){
          return
      }
      const card = elements.getElement(CardElement);
      if(card === null){
          return;
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type:"card",
          card
      })
      if(error){
          setCardError(error.message)
      }else{
          setCardError("")
          // console.log("payment Methord", paymentMethod)
      }
      setProcessing(true)
      const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method:{
            card:card,
            billing_details:{
              email: user?.email || "unknown",
              name: user?.displayName || "anonymous",
            }
          }
        }
      );
      if(confirmError){
        console.log(confirmError)
      }
      setProcessing(false)
      if(paymentIntent.status === "succeeded"){
        setTransactionId(paymentIntent.id)
        // TODO next steps
        const transactionId = paymentIntent.id;
      }
      console.log("paymentIntent",paymentIntent)

  }

  return (
    <>
        <form className='w-full m-8' onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button 
            className='px-5 py-2 bg-black text-white text-base font-medium rounded-md mt-5 cursor-pointer' 
            type="submit" 
            disabled={!stripe || !clientSecret || processing}
            >Pay
          </button>
        </form>
        {cardError && <p className='text-red-600'>{cardError}</p>}
        {transactionId && <p className='text-green-500'>Transaction complete with transactionId: {transactionId}</p>}
    </>
  )
}

export default CheckoutForm