import { FETCH_WISHLIST, GET_WISHLIST } from "store/reducers/wishlistReducers";


type wishtlistDemoFake = {
    userId: number,
    id: number,
    title: string,
    body: string
}

export default wishtlistDemoFake

export const wishlistAction = (wishlist: any[]) => {
    return{
        type: GET_WISHLIST,
        payload: wishlist
    };
}

export function fetchWishlistAction() {
    return {
        type: FETCH_WISHLIST
    }
}