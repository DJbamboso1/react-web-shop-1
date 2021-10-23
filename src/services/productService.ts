import { http } from "core"
import { convertObjectToQueryURL } from "utils"
import {Categories, PaginateData, Product, Product01, Product02} from '@types'


let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

export const productService = {
    paginate (filter?: Object) {
        let url = productAPI + '/Product/page' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
        return http.get<PaginateData<Product01>>(url)
    },

    getProductById(slug: string) {
        let url = productAPI + '/Product/' + slug
        console.log('url: ', url)
        return http.get<Product02<Product01>>(url)
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