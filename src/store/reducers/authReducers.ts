import { AUTH_LOGOUT, FETCH_LOGIN, LOGIN, LOGIN_ERROR } from "store/types"


type State = {
    user?: {
        
    },
    login: boolean,
    errorMsg: ''
}

let user: State['user'];

try {
    user = JSON.parse(localStorage.getItem('login') || '')
} catch (err) {
    user = undefined
}

const initState: State = {
    user,
    login: !!user,
    errorMsg: ''
}


const authReducer = (state = initState, action: any) => {
    console.log(action.payload)
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                login: true
            }

        case AUTH_LOGOUT:
            return {
                login: false,
                user: undefined
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                errorMsg: action.payload
            }
        }
    }
    return state
}

export default authReducer