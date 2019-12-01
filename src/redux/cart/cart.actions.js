import CartActionsTypes from './cart.types';

export const toggleCartHidden = () => {

   // console.log(CartActionsTypes.TOGGLE_CART_HIDDEN);
    return(
    {
    type: CartActionsTypes.TOGGLE_CART_HIDDEN
    }
)}