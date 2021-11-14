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
                payload: 'Không tồn tại tài khoản này !'
            })
        }
        else if (user.data.role && user.data.role.name !== 'Retailer') {
            yield put({
                type: LOGIN_ERROR,
                payload: 'Không tồn tại tài khoản này !'
            })
        }
        else {
            // let info = yield call(authService.getInfo, user.data.id)   
            // localStorage.setItem('token', JSON.stringify(user.data.jwtToken))
            console.log('aaaaaaaaaaaaaaaaa' , user.data)
            yield put(authLogin(user.data))

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