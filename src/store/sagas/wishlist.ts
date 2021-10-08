import { call, put, takeLatest } from 'redux-saga/effects'
import wishlistService from "../../services/wishlistService"
import { wishlistAction } from "../actions/wishlistAction"
import { FETCH_WISHLIST, GET_WISHLIST } from "../types"

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

export function* rootWishlistSaga() {
    yield takeLatest(GET_WISHLIST, getWishlist)
    // yield takeLatest(FETCH_, fetchLogin)
    // yield takeLatest(AUTH_LOGOUT, logout)
}