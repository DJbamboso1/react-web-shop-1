import wishlistService from "services/wishlistService"
import { call, put, takeLatest } from 'redux-saga/effects'
import { wishlistAction } from "store/actions/wishlistAction"
import { FETCH_WISHLIST, GET_WISHLIST } from "./reducers/wishlistReducers"
import { AUTH_LOGOUT, FETCH_LOGIN } from "./types"
import { fetchLogin, logout } from "./sagas.ts/auth"



function* getWishlist(): any {
    try {
       let res = yield call(wishlistService.getwishlist1)
    //    console.log('res: ' + res)
       if (res.error) {

       } else {
           yield put(wishlistAction(res))
       }
    } catch(err) {}
}

function* saga() {
    yield takeLatest(FETCH_WISHLIST, getWishlist)  
    yield takeLatest(FETCH_LOGIN, fetchLogin)
    yield takeLatest(AUTH_LOGOUT, logout)
}

export default saga