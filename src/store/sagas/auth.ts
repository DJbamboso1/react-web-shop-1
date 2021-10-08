import { call, put, takeLatest } from "@redux-saga/core/effects";
import authService from "../../services/authService";
import { authLogin } from "../../store/actions/authAction";
import { AUTH_LOGOUT, FETCH_LOGIN, LOGIN_ERROR } from "../../store/types";

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

export function* rootAuthSaga() {
    // yield takeLatest(GET_WISHLIST, getWishlist)
    yield takeLatest(FETCH_LOGIN, fetchLogin)
    yield takeLatest(AUTH_LOGOUT, logout)
}