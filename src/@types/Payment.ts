export interface Payment {
    succeed: boolean,
    message: string,
    errors: string,
    data: {
        id: string,
        name: string,
        description: string
    }[]
}

export interface Checkin {
    cart: {
        // product?: any
        id: string,
        quantity: number,
    }[],
    paymentMethodId: string,
    retailerId: string,
    shippingAddress: string,
    redirectUrl: string,
}

export interface Checkout {
    succeeded: true,
    message: string,
    errors: string,
    data: {
        sessionId: string,
        retailerId: string,
        paymentResponse: {
            partnerCode: string,
            requestId: string,
            orderId: string,
            amount: number,
            responseTime: number,
            message: string,
            resultCode: number,
            payUrl: string,
            deeplink: string,
            qrCodeUrl: string,
            deeplinkMiniApp: string
        },
        totalCost: 33700,
        paymentMethod?: {
            id: string,
            name: string,
            description: string
        },
        shippingAddress: string,
        orderResponses: [
            {
                id: string,
                sessionId: string,
                distributorId: string,
                orderCost: number,
                status: number
            }
        ],
        dateCreated: string
    }
}