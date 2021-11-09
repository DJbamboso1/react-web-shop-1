import { convertObjectToQueryURL } from "../utils"
import { http } from "../core"
import { Session } from "../@types/Session"
import { Order, OrderDetail, Order1 } from "../@types/Order"

let API = process.env.REACT_APP_API_KEY_SHOP || ''

export const orderService = {
    getAllOrder(filter?: Object) {
        let url = API + '/order' + (filter ? ('?' + convertObjectToQueryURL(filter)) : '')
        return http.get<Order>(url)
    },

    getOrderDetail(filter?: Object) {
        let url = API + '/order/product' + (filter ? ('?' + convertObjectToQueryURL(filter)) : '')
        return http.get<OrderDetail>(url)
    },

    getOrderById(id: string) {
        let url = API + '/order' + id
        return http.get<Order1>(url)
    }
}