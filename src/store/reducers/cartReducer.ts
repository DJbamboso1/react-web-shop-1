import { Product, Product01, Categories } from "../../@types";
import { CART_ADD_CART, CART_CHECKOUT, CART_CLEAR_CART, CART_DECREMENT, CART_INCREMENT, CART_REMOVE, CART_TOGGLE_CART } from "../types";

type CartStore = {
    openCart: boolean,
    list: {
        product: Product01,
        id: string,
        num: number,
    }[],
    tax: number,
}

type PayloadAction = {
    type: string,
    payload: any
}

const initState: CartStore = {
    openCart: false,
    list: JSON.parse(localStorage.getItem('cart') || '[]'),
    tax: 0.1
}

const cartReducer = (state = initState, action: PayloadAction): CartStore => {
    switch (action.type) {
        case CART_TOGGLE_CART: {
            // console.log('toggle toggle')
            // console.log('NOT undifined: ', action.payload)
            // console.log('state: ', state)
            let flag = state.openCart
            if (typeof action.payload === 'undefined') {
                flag = !flag
            } else {
                flag = action.payload
            }
            return {
                ...state,
                openCart: flag
            }
        }

        case CART_ADD_CART:
            let p = state.list.find(e => e.product.id === action.payload.id)
            if (p) {
                p.num++
                return {
                    ...state,
                    list: [...state.list]
                }
            }
        
            state.list.push({
                num: action.payload.quantity ? action.payload.quantity : action.payload.minQuantity,
                id: action.payload.id,
                product: action.payload
            })
            return {
                ...state,
                list: [...state.list]
            }

        case CART_INCREMENT:
            {
                let p = state.list.find(e => e.product.id === action.payload.id)
                if (p) {
                    p.num += action.payload?.num || 1
                }
                return {
                    ...state,
                    list: [...state.list]
                }
            }
        case CART_DECREMENT:
            {
                let p = state.list.find(e => e.product.id === action.payload.id)
                if (p) {
                    p.num -= typeof action.payload?.num !== 'undefined' ?  action.payload?.num : 1
                    if( p.num < p.product.minQuantity) {
                        p.num = p.product.minQuantity
                    }
                    // if (p.num === 0) {
                    //     let i = state.list.findIndex(e => e.product.id === action.payload.id)
                    //     if (i !== -1) {
                    //         state.list.splice(i, 1)
                    //     }
                    // }
                }
                return {
                    ...state,
                    list: [...state.list]
                }
            }

        case CART_REMOVE:
            {
                let i = state.list.findIndex(e => e.product.id === action.payload)
                if (i !== -1) {
                    state.list.splice(i, 1)
                }
                return {
                    ...state,
                    list: [...state.list]
                }
            }
        case CART_CLEAR_CART:
            {
                return {
                    ...state,
                    list: []
                }
            }

    }
    return state
}

export default cartReducer