export interface Order {
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
      parentCategoryId: string,
      parentCategoryName: null,
      subCategory: null,
      distributor: null,
      name: string,
      image: string,
      description: string,
      minQuantity: number,
      listPrice: null,
      status: number,
      isActive: boolean,
      dateCreated: string,
      dateModified: string
    },
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