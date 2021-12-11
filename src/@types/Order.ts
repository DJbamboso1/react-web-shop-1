export interface Order {
  pageNumber: number,
  pageSize: number,
  total: number,
  succeeded: boolean,
  message: String,
  errors: null,
  data:
  {
    id: string,
    sessionId: string,
    distributor: {
      id: string,
      user: {
        username: string,
        displayName: string
      }
    },
    orderCost: number,
    status: number,
    listImg: string[]
  }[]
}

export interface OrderDetail {
  pageNumber: number,
  pageSize: number,
  total: number,
  succeeded: boolean,
  message: null,
  errors: null,
  data:
  {
    id: string,
    product: {
      id: string,
      distributor: string,
      // category: T,
      name: string,
      image: string,
      // listImg?: [],
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
      }[]
    },
    defaultPrice: number,
    orderId: string,
    orderPrice: number,
    quantity: number
  }[]
}

export interface Order1 {
  succeeded: boolean,
  message: String,
  errors: null,
  data:
  {
    id: string,
    sessionId: string,
    distributor: {
      id: string,
      user: {
        username: string,
        displayName: string
      }
    },
    orderCost: number,
    status: number
  }
}