import { changeQueryURL, convertObjectToQueryURL } from "utils";
import { Distributor, User, Distributor1 } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const distributorService = {
    getDistributor(filter?: Object) {
        let url = productAPI + '/distributor' + (filter ? '?' + convertObjectToQueryURL(filter) : '')
        return http.get<Distributor<User['data']>>(url)
    },

    getDistributorById(id: string) {
        let url = productAPI + '/distributor/' + id
        return http.get<Distributor1<User['data']>>(url)
    }
}

export default distributorService