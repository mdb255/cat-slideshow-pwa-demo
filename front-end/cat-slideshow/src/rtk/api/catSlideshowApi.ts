import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCatEndpoints } from '../cats/cat-endpoints'
import { getSlideshowEndpoints } from '../slideshows/slideshow-endpoints'

// Define the base API slice
export const catSlideshowApi = createApi({
  reducerPath: 'catSlideshowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/',
  }),
  tagTypes: ['Cat', 'Slideshow'],
  endpoints: (builder) => ({
    // Combine cat and slideshow endpoints
    ...getCatEndpoints(builder),
    ...getSlideshowEndpoints(builder),
  }),
})
