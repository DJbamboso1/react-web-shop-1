// export interface PaginateData<T> {
//     data: T[],
//     paginate: {
//         currentPage: number,
//         totalPage: number,
//         count: number
//     }
// }

export interface PaginateData<T> {    
    pageNumber: number,
    pageSize: number,
    total: number,
    succeeded: boolean,
    message: string,
    errors: boolean,
    data: T[],
}