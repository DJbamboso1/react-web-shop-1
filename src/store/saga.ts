import { all } from "@redux-saga/core/effects"
import {cartRootSaga} from './sagas/cart'
import {rootAuthSaga} from './sagas/auth'

function* saga() {
    yield all([
        cartRootSaga(),
        rootAuthSaga()
    ])
}

export default saga