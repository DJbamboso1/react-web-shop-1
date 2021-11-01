import { convertObjectToQueryURL } from "../utils"
import { http } from "../core"
import { Session, Session1 } from "../@types/Session"

let API = process.env.REACT_APP_API_KEY_SHOP || ''

export const sessionService = {
    getAllSession(filter?: Object) {
        let url = API + '/session' + (filter ? ('?' + convertObjectToQueryURL(filter)) : '')
        return http.get<Session>(url)
    },

    getSessionById(id: string) {
        let url = API + `/session/${id}`
        return http.get<Session1>(url)
    }
}