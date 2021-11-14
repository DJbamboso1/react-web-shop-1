import { User } from "@types";
import { AUTH_GET_INFO, AUTH_LOGOUT, AUTH_UPDATE_INFO, FETCH_LOGIN, LOGIN } from "store/types";

type UserLogin = {
    username: string,
    password: string
}

export const authFetchAction = (user: UserLogin) => {
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

export const authLogin = (user: any) => {
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

export const updateInfo = (user: any) => {
    return {
        type: AUTH_UPDATE_INFO,
        payload: user
    }
}