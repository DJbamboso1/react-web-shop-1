import { User } from "@types";
import { AUTH_GET_INFO, AUTH_LOGOUT, AUTH_UPDATE_INFO, FETCH_LOGIN, LOGIN, LOGIN_ERROR } from "store/types"


export type State = {
    user?: {
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
    },
    login: boolean,
    errorMsg?: string,
    // permission: string[],
    role: string
}

type PayloadAction = {
    type: string,
    payload: any
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
    role: user?.role.name || ''
}



const authReducer = (state = initState, action: PayloadAction): State => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('login', JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload,
                login: true,
                role: action.payload.role.name ? action.payload.role.name : state.role
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
        case AUTH_UPDATE_INFO: {
            let user = JSON.parse(localStorage.getItem('login') || '')
            Object.assign(user, action.payload)
            localStorage.setItem('login', JSON.stringify(user))
            return {
                ...state,
                user: user,           
            }
        }

    }
    return state
}

export default authReducer