export interface Product01<T> {
    id: string,
    distributorId: string,
    category: T,
    name: string,
    image: string,
    description: string,
    minQuantity: number,
    status: number
}