export interface Distributor<T> {
    succeeded: true,
    message: string,
    errors: string,
    data: {
        id: string,
        userId: string,
        isActive: boolean,
        user?: T
    }[]
}