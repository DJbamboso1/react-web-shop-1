import { call, put } from "@redux-saga/core/effects";
import accountService from "services/accountService";
import { getAccountsAction } from "store/actions/accountAction";
import { GET_ACCOUNTS_ERROR } from "store/types";

export function* fetchAccount(): any {
    
    try {
        let accounts = yield call(accountService.getAccounts)
        console.log('accounts: ' , accounts)
        // console.log(accounts.succeeded)
        if (accounts.succeeded === false) {
            yield put({
                type: GET_ACCOUNTS_ERROR,
                payload: accounts.message
            })
        } else {
            console.log('account true !!!')
            yield put(getAccountsAction(accounts))
        }
    } catch (err) {

    }
}

