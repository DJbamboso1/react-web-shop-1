import { Product01 } from "@types"

export const currency = (price: number) => {
    return  price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

export const calculateTotal = ( product: Product01, num: number ) => {
    let total = 0
    if(product.listPrice[0]) {
        total = product.listPrice[0].value * num
    }
    for (let i in product.listPrice) {
        let item = product.listPrice[i]
        if( num >= item.volume ) {
           total = item.value * num
        } 
    }
    return total
}

export const getPricePerPro = ( product: Product01, num: number ) => {
    let total = 0
    if(product.listPrice[0]) {
        total = product.listPrice[0].value 
    }
    for (let i in product.listPrice) {
        let item = product.listPrice[i]
        if( num >= item.volume ) {
           total = item.value 
        } 
    }
    return total
}