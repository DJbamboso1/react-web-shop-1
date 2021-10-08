import { http } from "core"
import { convertObjectToQueryURL } from "utils"
import {Categories, PaginateData, Product, Product01} from '@types'


let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''
console.log(process.env)

export const productService = {
    paginate (filter?: Object) {
        let url = productAPI + '/Product/page' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
        return http.get<PaginateData<Product01<Categories>>>(url)
    }
}

// let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''
// console.log(process.env)

// export const productService = {
//     paginate (filter?: Object) {
//         let url = productAPI + '/Product/page' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
//         return http.get<PaginateData<Product01>>(url)
//     }
// }