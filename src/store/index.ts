import { combineReducers } from "redux";
import { accountReducer } from "./reducers/accountReducer";
import authReducer from "./reducers/authReducers";
import wishlistReducers from "./reducers/wishlistReducers";
// import cartReducer from "./reducers/cartReducer";

export const reducers = combineReducers({
    auth: authReducer,
    // cart: cartReducer
    wishlist: wishlistReducers,
    account: accountReducer,
})

export type StateStore = ReturnType<typeof reducers>
// export default StateStore

// let auth = useSelector<StateStore>(store => store.auth)