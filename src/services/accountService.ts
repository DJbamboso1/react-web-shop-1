const accountService = {
    async getAccounts() {
        return fetch('https://b2bflatform.azurewebsites.net/api/v1/user').then(res => {
                console.log('res: ', res.json)
                return res.json()
            })
    }
}

export default accountService