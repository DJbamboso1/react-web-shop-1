import { Product01, Categories, Checkin } from "../../@types";
import { CART_ADD_CART, CART_CHECKOUT, CART_CHECK_LOGIN, CART_DECREMENT, CART_INCREMENT, CART_REMOVE, CART_TOGGLE_CART } from "../types";

 export function toggleCart(flag?: boolean) {
     return {
         type: CART_TOGGLE_CART,
         payload: flag
     }
 }

 export function addToCart(product: Product01) {
     return {
         type: CART_CHECK_LOGIN,
         payload: product
     }
 }

 export function cartRemove(id: string) {
     return {
         type: CART_REMOVE,
         payload: id
     }
 }

 export function cartIncrement( param: { id: string, num?: number } ){
    return {
        type: CART_INCREMENT,
        payload: param
    }
}

export function cartDecrement( param: { id: string, num?: number } ){
    return {
        type: CART_DECREMENT,
        payload: param
    }
}

export function cartCheckout( param: any) {
    return {
        type: CART_CHECKOUT,
        payload: param
    }
}