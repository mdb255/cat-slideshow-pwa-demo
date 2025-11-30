// Cat model interfaces matching backend models

export interface Cat {
    id: number
    name: string
    breed?: string
    age?: number
    color?: string
    description?: string
    created_at: string
    updated_at: string
}

export interface CatCreate {
    name: string
    breed?: string
    age?: number
    color?: string
    description?: string
}

export interface CatUpdate {
    name?: string
    breed?: string
    age?: number
    color?: string
    description?: string
}

// Query parameter types for cats
export interface CatsQueryParams {
    skip?: number
    limit?: number
    breed?: string
    min_age?: number
    max_age?: number
    search?: string
}
