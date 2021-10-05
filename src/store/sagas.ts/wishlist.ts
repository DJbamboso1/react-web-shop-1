import { call, put } from "@redux-saga/core/effects"
import wishlistService from "services/wishlistService"
import { wishlistAction } from "store/actions/wishlistAction"

export function* getWishlist(): any {
    try {
       let res = yield call(wishlistService.getwishlist1)
    //    console.log('res: ' + res)
       if (res.error) {

       } else {
           yield put(wishlistAction(res))
       }
    } catch(err) {}
}