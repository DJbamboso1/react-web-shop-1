import { Product01, Categories } from "../../@types";
import { CART_ADD_CART, CART_CHECK_LOGIN, CART_DECREMENT, CART_INCREMENT, CART_REMOVE, CART_TOGGLE_CART } from "../types";

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

 export function cartIncrement(id: string){
    return {
        type: CART_INCREMENT,
        payload: id
    }
}

export function cartDecrement(id: string){
    return {
        type: CART_DECREMENT,
        payload: id
    }
}