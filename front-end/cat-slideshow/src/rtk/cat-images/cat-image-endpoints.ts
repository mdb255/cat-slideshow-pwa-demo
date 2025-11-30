import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Cat Image endpoint definitions
export const getCatImageEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
    getCatImages: builder.query<string[], void>({
        query: () => 'cat-images/',
        providesTags: [{ type: 'CatImage' as const, id: 'LIST' }],
    }),
})

