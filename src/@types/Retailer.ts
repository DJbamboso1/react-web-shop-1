export interface Retailer {
    succeeded: boolean,
    message: string,
    errors: null,
    data: {
        id: string,
        userId: string,
        isActive: boolean
    }
}