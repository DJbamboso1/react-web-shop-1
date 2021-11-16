export interface Banner {
    succeeded: boolean,
    message: string,
    errors: null,
    data:
    {
        id: string,
        distributorId: string,
        name: string,
        link: string,
        image: string
        position: number
    }[]
}