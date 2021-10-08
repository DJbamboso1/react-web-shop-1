import { PaginateData, Product, Product01 } from '../../@types'
import React from 'react'
import { FETCH_PRODUCT, GET_PRODUCT } from '../types'


export interface State {
    products?: {
        data: {
            id: number,
            slug: string
            thumbnail_url: string
            price: number
            real_price: number
            name: string
        }[],
        paginate: {
            currentPage: number,
            totalPage: number,
            count: number
        }
    }
}

// let product: State['products'];



export const productReducers = (state: State = {}, action: any): State => {
    switch (action.type) {
        case GET_PRODUCT: {
            return {
                ...state,
                products: action.payload
            }
        }
    }
    return state
}
