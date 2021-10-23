import { AUTH_LOGOUT, FETCH_LOGIN, LOGIN, LOGIN_ERROR } from "store/types"


export type State = {
    user?: {
        succeeded: boolean,
        message: string,
        errors: null,
        data?: {
            id: string,
            roleId: string,
            username: string,
            displayName: string,
            avatar: null,
            email: string,
            phoneNumber: string,
            jwtToken: string
        }
    },
    login: boolean,
    errorMsg?: ''
}

type PayloadAction = {
    type: string,
    payload: State['user'] 
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
    errorMsg: ""
}


const authReducer = (state = initState, action: PayloadAction): State => {
    
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
                user: undefined,
                errorMsg: ""
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                user: undefined,
                errorMsg: action.payload?.message
            } as State
        }
    }
    return state
}

export default authReducer