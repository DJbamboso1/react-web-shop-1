
const authService = {
    async login(user: { username: string, password: string }) {
        return fetch('https://b2bflatform.azurewebsites.net/api/v1/account', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        }).then(res => {
            console.log(res.json)
            // if (res.status === 200 || res.status === 400) {
                return res.json()
            // } 
        })
    }
}

export default authService 