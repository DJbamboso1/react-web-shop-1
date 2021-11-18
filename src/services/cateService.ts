import { convertObjectToQueryURL } from "utils";
import { CategoryTree, CategoryAll } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const cateService = {
    getCategory(filter?: Object) {
        let url = productAPI + '/category' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
        return http.get<CategoryAll>(url)
    }
}

export default cateService