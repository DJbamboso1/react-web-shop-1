export interface User {
    succeeded?: boolean,
    message?: string,
    errors?: null,
    data: {
        id: string,
        roleId: string,
        username: string,
        displayName: string,
        doB: Date,
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