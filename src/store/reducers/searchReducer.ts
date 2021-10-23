import { Product, Product01, Categories } from "../../@types";
import { SEARCH_TOGGLE_SEARCH } from "../types";

type SearchStore = {
    openSearch: boolean,
    list?: {
        product: Product01
    }[]
}

type PayloadAction = {
    type: string,
    payload: any
}

const initState: SearchStore = {
    openSearch: false,
    list: []
}

const searchReducer = (state = initState, action: PayloadAction): SearchStore => {
    switch (action.type) {
        case SEARCH_TOGGLE_SEARCH: {
            let flag = state.openSearch
            if (typeof action.payload === 'undefined') {
                flag = !flag
            } else (
                flag = action.payload
            )
            // console.log('1: ', flag)
            // console.log(state.openSearch)
            return {
                ...state,
                openSearch: flag
            }
        }
    }
    // console.log(state)
    return state
}
export default searchReducer