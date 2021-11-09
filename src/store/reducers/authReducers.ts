import { User } from "@types";
import { AUTH_GET_INFO, AUTH_LOGOUT, FETCH_LOGIN, LOGIN, LOGIN_ERROR } from "store/types"


export type State = {
    user?: {
        succeeded: boolean,
        message: string,
        errors: null,
        data?: {
            id: string,
            role: {
                id: string,
                name: string
            },
            actorId: string,
            username: string,
            displayName: string,
            avatar: null,
            email: string,
            phoneNumber: string,
            jwtToken: string
        }
    },
    login: boolean,
    errorMsg?: string,
    // permission: string[],
    role: string
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
    errorMsg: "",
    role: user?.data?.role.name || ''
}


const authReducer = (state = initState, action: PayloadAction): State => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                login: true,
                role: action.payload?.data?.role.name || ''
            } 
        case AUTH_LOGOUT:
            return {
                login: false,
                user: undefined,
                errorMsg: "",
                role: ''
            } as State
        case LOGIN_ERROR: {
            return {
                ...state,
                user: undefined,
                errorMsg: action.payload,
                role: '' 
            } as State
        }
        
    }
    return state
}

export default authReducer