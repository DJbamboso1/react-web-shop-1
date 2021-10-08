import { FilterQuery } from 'pages/product'
import {PaginateData, Product, Product01} from '../../@types'
import {FETCH_PRODUCT, GET_PRODUCT} from '../types' 


export const fetchProductsAction = (filter: Partial<FilterQuery>) => {
    return {
        type: FETCH_PRODUCT,
        payload: filter
    }
}

export const getProductsAction = (product: PaginateData<Product>) => {
    return {
        type: GET_PRODUCT,
        payload: product
    }
}