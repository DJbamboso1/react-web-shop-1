export interface CategoryTree {
    id: string,
    name: string,
    subCategories?: CategoryTree[]
}

export interface CategoryAll {
    succeeded: boolean,
    message: string,
    errors: string,
    data: CategoryTree[]
}

