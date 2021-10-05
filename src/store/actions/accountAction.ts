import { FETCH_ACCOUNTS, GET_ACCOUNTS } from "store/types";


interface State {
    acc?: {
        succeeded: boolean,
        message: string,
        errors: null,
        data: {
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

export const getAccountsAction = (acc: State) => {
    console.log(acc)
    return {
        type: GET_ACCOUNTS,
        payload: acc
    }
}

export function fetchAccountsAction() {
    console.log('fetch')
    return {
        type: FETCH_ACCOUNTS
    }
}