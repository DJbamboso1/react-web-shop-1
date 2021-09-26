import React from 'react'

export const GET_WISHLIST = 'GET_WISHLIST'

const initState = {}

const wishlistReducers = (state = initState, action: any) => {
    console.log('action.type: ' + action.type)
    switch (action.type) {
        case GET_WISHLIST: {
            return {
                ...state
            }
        }
    }
    // console.log('state: ' + state)
    return state
}

export default wishlistReducers
