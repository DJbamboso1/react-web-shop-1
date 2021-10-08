class Http {
    get<T>(url: string): Promise<T> {
        return fetch(url).then(res => res.json())
    }
    
    post<T>(url: string, form: object): Promise<T>{
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        }).then(res => res.json())
    }

    put(){}
    delete(){}
}

export const http = new Http()