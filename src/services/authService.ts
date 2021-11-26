import { Retailer, User, UserRegister } from "@types"
import { http } from "core"
import Register from "pages/authenicate/register"
let API = process.env.REACT_APP_API_KEY_SHOP || ''

const authService = {
    async login(user: { username: string, password: string }) {
        let url = API + '/account'
        // return fetch(API + '/account', {
        //     method: 'POST',
        //     body: JSON.stringify(user),
        //     headers: {
        //         'Content-Type': 'application/json-patch+json'
        //     }
        // }).then(res => {
        //     console.log(res.json)
        //     // if (res.status === 200 || res.status === 400) {
        //         return res.json()
        //     // } 
        // })
        return http.post(url, user)
    },

    async getInfo(id: string) {
        let url = API + '/user/' + id
        return http.get<User>(url)
    },

    async register(user: UserRegister) {
        
        let url = API + '/user'
        return http.post<{ succeeded: boolean, message: string, error: null, data: string }>(url, user)
    },

    registerRetailer(userId: Object) {        
        let url = API + '/retailer'
        return http.post<{ succeeded: boolean, message: string, error: null, data: string }>(url, userId)
    },

    updateProfile(user: User['data']) {
        let url = API + '/user'
        return http.put<User>(url, user)
    },

    checkUsername(username: string) {
        let url = API + '/user/check/username?username=' + username
        return http.get<{ succeeded: boolean, message: string, error: null, data: boolean }>(url)
    },

    checkEmail(username: string) {
        let url = API + '/user/check/email?email=' + username
        return http.get<{ succeeded: boolean, message: string, error: null, data: boolean }>(url)
    },

    updatePassword(obj: {userId: string, oldPassword: string, newPassword: string, comfirmPassword: string}) {
        let url = API + '/update-password'
        return http.put(url, obj)
    },

    vertificateEmail(id: string) {
        let url = API + `/user/email-vertification?activationCode=${id}`
        return http.put<{ succeeded: boolean, message: string, error: null, data: string }>(url, id)
    },

    getRetailerById(actorId: string) {
        let url = API + `/retailer/${actorId}`
        return http.get<Retailer>(url)
    }
}

export default authService