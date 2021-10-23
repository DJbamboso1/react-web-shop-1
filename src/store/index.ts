import { combineReducers } from "redux";
import authReducer from "./reducers/authReducers";
import wishlistReducers from "./reducers/wishlistReducers";
import cartReducer from './reducers/cartReducer'
import { productReducers } from "./reducers/productReducers";
import searchReducer from './reducers/searchReducer'
// import cartReducer from "./reducers/cartReducer";


export const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducers,
    product: productReducers,
    search: searchReducer
})

export type StateStore = ReturnType<typeof reducers>
// export default StateStore

// let auth = useSelector<StateStore>(store => store.auth)