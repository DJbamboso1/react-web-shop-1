import { call, put } from "@redux-saga/core/effects";
import authService from "services/authService";
import { authLogin } from "store/actions/authAction";
import { LOGIN_ERROR } from "store/types";

export function* fetchLogin(action: any) : any {
    console.log('aaaaaaaaaaaaaaaaaaaa')
    try {
        let user = yield call(authService.login, action.payload)
        console.log(user.succeeded)
        if (user.succeeded === false) {
            yield put({
                    type: LOGIN_ERROR,
                    payload: user.message
            })
        } else {
            localStorage.setItem('login', JSON.stringify(user))
            yield put(authLogin(user))
        }
    } catch( err ) {

    }
}

export function* logout() : any{
    localStorage.removeItem('login')
}