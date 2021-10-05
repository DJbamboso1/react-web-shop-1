import React from 'react'

import { GET_ACCOUNTS, GET_ACCOUNTS_ERROR } from 'store/types'


interface State {
    acc?: {
        succeeded: boolean,
        message: string,
        errors: null,
        data?: {
            id: string,
            roleId: string,
            userName: string,
            displayName: string,
            password: string,
            doB: string,
            avatar: string,
            sex: number,
            phoneNumber: string,
            address: string
        }[]
    },
}

let acc: State['acc'];

const initState: State = {  }

export const accountReducer = (state = initState, action: any) => {
    console.log(action.payload)
    switch (action.type) {
        case GET_ACCOUNTS: {
            return {
                ...state,
                acc: action.payload
            }
        }
    }
    return state
}
