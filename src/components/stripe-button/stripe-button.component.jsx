import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_xu01wRRMFhV9Q3uloAeAbovx00kWiGZgZq';

    const onToken = token => {
        alert("payment Successful")
    }
    
     return (
         <StripeCheckout 
           label="Pay Now"
           name = "CRMW Clothing Ltd."
           billingAddress
           shippingAddress
           image="https://svgshare.com/i/CUz.svg"
           description={`Your total is $${price}`}
           account = {priceForStripe}
           panelLabel="Pay Now"
           token={onToken}
           stripeKey={publishableKey}
         />
     )
}

export default StripeCheckoutButton;