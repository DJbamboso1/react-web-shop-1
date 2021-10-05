const accountService = {
    async getAccounts() {
        return fetch('https://b2bflatform.azurewebsites.net/api/v1/account',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }).then(res => {
                return res.json()
            })
    }
}

export default accountService