import { GET_ACCOUNTS } from "store/types";


type Account = {
    roleId: string,
    userName: string,
    displayName: string,
    password: string,
    doB: string,
    avatar: string,
    sex: number,
    phoneNumber: string,
    address: string
}


export const getAccountsAction = (accounts: Account[]) => {
    console.log(accounts)
    return {
        type: GET_ACCOUNTS,
        payload: accounts
    }
}