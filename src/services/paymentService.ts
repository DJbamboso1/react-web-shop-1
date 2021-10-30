
import { Payment, Checkout, Checkin } from "../@types/Payment"
import { http } from "../core"

let API = process.env.REACT_APP_API_KEY_SHOP || ''

export const paymentService = {
    getAllPayments() {
        let url = API + '/payment-method'
        return http.get<Payment>(url)
    },

    checkout(obj: Checkin) {
        let url = API + '/checkout'
        
        return http.post<Checkout>(url, obj)
    }
}