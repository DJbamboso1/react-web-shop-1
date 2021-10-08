import { call, put } from "@redux-saga/core/effects"
import { productService } from "services/productService"
import { getProductsAction } from "store/actions/productAction"

export function* fetchProducts(action: any): any {
    try {
        let products = yield call(productService.paginate, action.payload)
        console.log('product in sagas:', products)
        // if (products.succeeded === false) {
            
        // } else {
            
        // }
        yield put(getProductsAction(products))
    } catch( err ) {

    }
}