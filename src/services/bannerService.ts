import { Banner } from "../@types";
import { http } from "../core"

let productAPI = process.env.REACT_APP_API_KEY_SHOP || ''

const bannerService = {
    getBanner(distributorId?: string) {
        let url = productAPI + '/banner'
        return http.get<Banner>(url)
    },
}

export default bannerService