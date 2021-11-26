export interface Distributor<T> {
    succeeded: true,
    message: string,
    errors: string,
    pageNumber?: number,
    pageSize?: number,
    total?: number,
    data: {
        id: string,
        userId: string,
        isActive: boolean,
        user?: T,
        displayName: string
    }[]
}