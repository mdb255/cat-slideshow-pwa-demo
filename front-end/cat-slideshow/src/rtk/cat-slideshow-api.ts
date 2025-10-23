import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCatEndpoints } from './cats/cat-endpoints'
import { getSlideshowEndpoints } from './slideshows/slideshow-endpoints'
import { getCatImageEndpoints } from './cat-images/cat-image-endpoints'

// Define the base API slice
export const catSlideshowApi = createApi({
    reducerPath: 'catSlideshowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
    }),
    tagTypes: ['Cat', 'Slideshow', 'CatImage'],
    endpoints: (builder) => ({
        // Combine cat, slideshow, and cat image endpoints
        ...getCatEndpoints(builder),
        ...getSlideshowEndpoints(builder),
        ...getCatImageEndpoints(builder),
    }),
})
