import { AUTH_GET_INFO, AUTH_LOGOUT, FETCH_LOGIN, LOGIN } from "store/types";

type User = {
    username: string,
    password: string
}

export const authFetchAction = (user: User) => {
    // console.log(user)
    return {
        type: FETCH_LOGIN,
        payload: user
    }
}

export const authGetInfo = (id: string) => {
    return {
        type: AUTH_GET_INFO,
        payload: id
    }
}

export const authLogin = (user: User) => {
    // console.log(user)
    return {
        type: LOGIN,
        payload: user
    }
}

export const authLogoutAction = () => {
    return {
        type: AUTH_LOGOUT
    }
}