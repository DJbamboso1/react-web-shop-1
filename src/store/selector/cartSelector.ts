import { useMemo } from "react"
import { useSelector } from "react-redux"
import { StateStore } from "../../store"
import {createSelector} from 'reselect'
import { listenerCount } from "process"
import { calculateTotal } from "utils"

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
    let total = 0
    for(let i in list) {
        let item = list[i]
        total += calculateTotal(item.product, item.num)
    }
    return total
})

export const getTaxPrice = createSelector(getSubtotal, getTax, (subtotal, tax) => {
    return subtotal * tax
})

export const getPrice = createSelector(getCartProduct, (list) => {
    return 
}) 

// total

const getTotal = createSelector(getSubtotal, getTax, (subtotal, tax) => {
    return subtotal * tax  + subtotal
})

export const useTotal = () => useSelector(getTotal)