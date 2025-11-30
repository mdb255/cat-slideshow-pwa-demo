// Slideshow model interfaces matching backend models

export interface Slideshow {
    id: number
    title: string
    description?: string
    image_urls: string[]
    cat_id: number
    created_at: string
    updated_at: string
}

export interface SlideshowCreate {
    title: string
    description?: string
    image_urls: string[]
    cat_id: number
}

export interface SlideshowUpdate {
    title?: string
    description?: string
    image_urls?: string[]
    cat_id?: number
}

// Query parameter types for slideshows
export interface SlideshowsQueryParams {
    skip?: number
    limit?: number
}

export interface SlideshowsByCatParams {
    cat_id: number
    skip?: number
    limit?: number
}

export interface SearchSlideshowsParams {
    search_term: string
    skip?: number
    limit?: number
}
