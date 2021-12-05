import { changeQueryURL, convertObjectToQueryURL } from "utils";
import { Distributor, User } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const distributorService = {
    getDistributor(filter?: Object) {
        let url = productAPI + '/distributor' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
        return http.get<Distributor<User['data']>>(url)
    }
}

export default distributorService