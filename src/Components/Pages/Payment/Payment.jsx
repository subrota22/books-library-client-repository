import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Typewriter } from 'react-simple-typewriter' ;
const Payment = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const product = useLoaderData() ;
    return (
        <>
            <Helmet>
                <title> Payments </title>
            </Helmet>
            <div className='text-center my-3 py-12  shadow-2xl'>
                <h2 className='text-2xl font-bold'>
            
          
                      {
                                  <Typewriter
                                  words={['Please ' , 'pay for',  product?.bookName , "book"]}
                                  loop={Infinity}
                                  cursor
                                  cursorStyle='_'
                                  typeSpeed={70}
                                  deleteSpeed={50}
                                  delaySpeed={1000}
                                />
                      }
                                  </h2>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm 
            product = {product}
                />
            </Elements>

        </>
    );
};

export default Payment;