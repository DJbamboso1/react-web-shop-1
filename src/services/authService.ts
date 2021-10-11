import { http } from "core"
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
    }
}

export default authService 