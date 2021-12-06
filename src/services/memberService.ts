import { Membership, MembershipRank } from "../@types"
import { http } from "../core"
let API = process.env.REACT_APP_API_KEY_SHOP || ''

export const memberService = {
    async getMembership(retailerId: string, disitributorId: string) {
        let url = API + `/membership/distributor/${disitributorId}/customer/${retailerId}`
        return http.get<Membership>(url)
    },

    async getMembershipRank(id: string) {
        let url = API + `/membership-rank/${id}`
        return http.get<MembershipRank>(url)
    }
}
