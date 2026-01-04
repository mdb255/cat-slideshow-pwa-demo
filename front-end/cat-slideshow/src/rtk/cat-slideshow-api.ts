import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCatEndpoints } from './cats/cat-endpoints'
import { getSlideshowEndpoints } from './slideshows/slideshow-endpoints'
import { getCatImageEndpoints } from './cat-images/cat-image-endpoints'
import { getAuthEndpoints } from './auth/auth-endpoints'

// Define the base API slice
export const catSlideshowApi = createApi({
    reducerPath: 'catSlideshowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
        credentials: 'include', // Include cookies for auth
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any)?.auth?.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Cat', 'Slideshow', 'CatImage'],
    endpoints: (builder) => ({
        // Combine cat, slideshow, cat image, and auth endpoints
        ...getCatEndpoints(builder),
        ...getSlideshowEndpoints(builder),
        ...getCatImageEndpoints(builder),
        ...getAuthEndpoints(builder),
    }),
})
