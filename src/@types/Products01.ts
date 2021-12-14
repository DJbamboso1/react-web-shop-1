export interface Product01 {
    id: string,
    distributor: string,
    distrubutorId?: string,
    name: string,
    image: string,
    description: string,
    minQuantity: number,
    status?: number,
    parentCategoryId?: string,
    parentCategoryName?: string,
    subCategory?: {
        id: string,
        name: string
      },
    // price: 0.1
    listPrice?: {
        id: string,
        productId: string,
        value: number,
        volume: number,
    }[],
    quantity?: number
}

export interface Product02<T> {
    succeed: boolean,
    message: string,
    errors: string,
    data: T
}