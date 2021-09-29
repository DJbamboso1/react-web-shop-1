import { call, put } from "@redux-saga/core/effects";
import authService from "services/authService";
import { authLogin } from "store/actions/authAction";
import { LOGIN_ERROR } from "store/types";

export function* fetchLogin(action: any) : any {
    try {
        let user = yield call(authService.login, action.payload)
        console.log(user)
        if (user.errors === null) {
            yield put({
                    type: LOGIN_ERROR,
                    payload: user.errors
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