import { Product, Product01, Categories } from "../../@types";
import { CART_ADD_CART, CART_DECREMENT, CART_INCREMENT, CART_REMOVE, CART_TOGGLE_CART } from "../types";

type CartStore = {
    openCart: boolean,
    list: {
        product: Product01<Categories>,
        num: number,
    }[]
}

type PayloadAction = {
    type: string,
    payload: any
}

const initState: CartStore = {
    openCart: false,
    list: JSON.parse(localStorage.getItem('cart') || '[]')
}

const cartReducer = (state = initState, action: PayloadAction): CartStore => {
    switch( action.type) {
        case CART_TOGGLE_CART: {
            console.log('toggle toggle')
            let flag = state.openCart
            if(typeof action.payload === 'undefined') {
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
            if(p){
                p.num++
                return {
                    ...state,
                    list: [...state.list]
                }
            }
            state.list.push({
                num: 1,
                product: action.payload
            })
            return {
                ...state,
                list: [...state.list]
            }

            case CART_INCREMENT:
                {
                    let p = state.list.find(e => e.product.id === action.payload)
                    if (p) {
                        p.num++
                    }
                    return {
                        ...state,
                        list: [...state.list]
                    }
                }
            case CART_DECREMENT:
                {
                    let p = state.list.find(e => e.product.id === action.payload)
                    if (p) {
                        p.num--
    
                        if (p.num === 0) {
                            let i = state.list.findIndex(e => e.product.id === action.payload)
                            if (i !== -1) {
                                state.list.splice(i, 1)
                            }
                        }
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
    }
    return state
}

export default cartReducer