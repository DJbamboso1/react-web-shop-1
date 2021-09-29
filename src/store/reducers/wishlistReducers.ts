import React from 'react'

export const GET_WISHLIST = 'GET_WISHLIST'

export const FETCH_WISHLIST = 'FETCH_WISHLIST' 

interface State {
    list: {
        userId: number,
        id: number,
        title: string,
        body: string
    }[]
}

const initState: State = {list: []}

const wishlistReducers = (state = initState, action: any) => {
    console.log('action.type: ' + action.type)
    switch (action.type) {
        case GET_WISHLIST: {
            return {
                ...state,
                list: action.payload
            }
        }
    }
    // console.log('state: ' + state)
    return state
}

export default wishlistReducers
