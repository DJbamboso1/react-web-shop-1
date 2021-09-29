import { AUTH_LOGOUT, FETCH_LOGIN, LOGIN } from "store/types";

type User = {
    username: string,
    password: string
}

export const authFetchAction = (user: User) => {
    console.log(user)
    return {
        type: FETCH_LOGIN,
        payload: user
    }
}

export const authLogin = (user: User) => {
    console.log(user)
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