export interface User {
    succeeded?: boolean,
    message?: string,
    errors?: null,
    data: {
        id: string,
        roleId: string,
        username: string,
        displayName: string,
        doB: string,
        day: number,
        month: number,
        year: number,
        avatar: string,
        sex: number,
        email: string,
        phoneNumber: string,
        address: string,
        isActive: boolean,
        dateCreated: Date,
        dateModified: Date
    }
}

export interface UserRegister {
    roleId: string,
    username: string,
    displayName: string,
    password: string,
    doB: string,
    avatar: string,
    sex: number,
    email: string,
    phoneNumber: string,
    address: string,
}
