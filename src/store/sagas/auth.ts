import { call, put, takeLatest } from "@redux-saga/core/effects";
import authService from "../../services/authService";
import { authGetInfo, authLogin } from "../actions/authAction";
import { AUTH_LOGOUT, FETCH_LOGIN, LOGIN_ERROR } from "../types";

export function* fetchLogin(action: any): any {
    try {
        let user = yield call(authService.login, action.payload)
        // console.log(user)
        if (!user.data) {
            yield put({
                type: LOGIN_ERROR,
                payload: user.message
            })
        } else {
            // let info = yield call(authService.getInfo, user.data.id)
            localStorage.setItem('login', JSON.stringify(user))
            // localStorage.setItem('token', JSON.stringify(user.data.jwtToken))
            yield put(authLogin(user))
            
        }
    } catch (err) {

    }
}

export function* logout(): any {
    localStorage.removeItem('login')
}

export function* rootAuthSaga() {
    // yield takeLatest(GET_WISHLIST, getWishlist)
    yield takeLatest(FETCH_LOGIN, fetchLogin)
    yield takeLatest(AUTH_LOGOUT, logout)
}