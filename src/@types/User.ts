export interface User {
    id?: string,
    roleId?: string,
    username: string,
    displayName: string,
    doB?: Date,
    avatar?: string,
    sex?: number,
    email?: string,
    phoneNumber?: string,
    address?: string,
    isActive?: boolean,
    dateCreated?: Date,
    dateModified?: Date
}