import { GET_WISHLIST } from "store/reducers/wishlistReducers"

const wishlistService = {
    // getWishlist() {
    //     try {
    //         fetch('/fakeData')
    //     } catch (err) {}
    //     return new Promise((res, reject) => {
            
    //     })
    // },

    getwishlist1() {
        
        return fetch('/fakeData/wishlistData.json', {
            headers:{'content-type' : 'application/json'} 
        }).then(
            res => {
                if(res.status === 200) {
                    
                    return res.json();
                }
            }
        )
    }
}

export default wishlistService