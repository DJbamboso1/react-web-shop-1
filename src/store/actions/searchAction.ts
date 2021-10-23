import { SEARCH_TOGGLE_SEARCH } from "../types";


export function toggleSearch(flag?: boolean) {
    console.log('flag', flag)
    return {
        type: SEARCH_TOGGLE_SEARCH,
        payload: flag
    }
}