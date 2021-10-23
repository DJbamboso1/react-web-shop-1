import { CategoryTree, CategoryAll } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const cateService = {
    getCategory(filter?: Object) {
        let url = productAPI + '/category'
        return http.get<CategoryAll>(url)
    }
}

export default cateService