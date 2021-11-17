import { Distributor, User } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const distributorService = {
    getDistributor(filter?: Object) {
        let url = productAPI + '/distributor'
        return http.get<Distributor<User>>(url)
    }
}

export default distributorService