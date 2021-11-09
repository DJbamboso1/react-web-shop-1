import { Product01 } from "@types"

export const currency = (price: number) => {
    return  price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

