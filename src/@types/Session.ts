export interface Session {
    pageNumber: number,
    pageSize: number,
    total: number,
    succeeded: true,
    message: string,
    errors: string,
    data: {
        id: string,
        retailerId: string,
        retailerName: string,
        paymentMethod?: {
            id: string,
            name: string,
            description: string
        },
        totalCost: number,
        shippingAddress: string,
        status: number,
        dateCreated: string,
        dateModified?: string
    }[]
}

export interface Session1 {
    succeeded: true,
    message: string,
    errors: string,
    data: {
        id: string,
        retailerId: string,
        paymentMethod?: {
            id: string,
            name: string,
            description: string
        } | null,
        totalCost: number,
        shippingAddress: string,
        status: number,
        dateCreated: string,
        dateModified?: string
    }
}