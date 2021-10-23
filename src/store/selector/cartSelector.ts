import { useMemo } from "react"
import { useSelector } from "react-redux"
import { StateStore } from "../../store"
import {createSelector} from 'reselect'
import { listenerCount } from "process"

export const useCart = () => useSelector((store: StateStore) => store.cart)

////////////////////////////////////////////////////////////////////////////

// export function useCartNumber() {
//     let { list } = useSelector((store: StateStore) => store.cart)
//     const num = useMemo(() => {
//         return list.reduce((pre, item) => pre + item.num, 0)
//     }, [list])

//     return num
// }

const getCartProduct = (store: StateStore) => store.cart.list


const getTax = (store: StateStore) => store.cart.tax

const getCartNumber = createSelector(getCartProduct, (list) => {
    return list.reduce((pre, item) => pre + item.num, 0)
})

export const useCartNumber = () => useSelector(getCartNumber)

// subtotal

export const getSubtotal = createSelector(getCartProduct, (list) => {
    return list.reduce((pre, item) => pre + (item.product && ((item.product.listPrice.length > 0) ? item.product.listPrice[0].value : 0)) * item.num , 0)  //sửa tạm
})

export const getTaxPrice = createSelector(getSubtotal, getTax, (subtotal, tax) => {
    return subtotal * tax
})

export const getPrice = createSelector(getCartProduct, (list) => {
    return null
}) 

// total

const getTotal = createSelector(getSubtotal, getTax, (subtotal, tax) => {
    return subtotal * tax  + subtotal
})

export const useTotal = () => useSelector(getTotal)