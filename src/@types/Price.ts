export interface Price {
    succeed: boolean,
    message: string,
    errors: null,
    data: {
        id: string,
        productId: string,
        value: number,
        volume: number
    }[]
}