import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import type {
    Cat,
    CatCreate,
    CatUpdate,
    CatsQueryParams,
} from './cat-model'

// Cat-specific endpoint definitions
export const getCatEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
    getCats: builder.query<Cat[], CatsQueryParams>({
        query: (params: CatsQueryParams) => ({
            url: 'cats/',
            params,
        }),
        providesTags: (result: Cat[] | undefined) =>
            result
                ? [
                    ...result.map(({ id }) => ({ type: 'Cat' as const, id })),
                    { type: 'Cat', id: 'LIST' },
                ]
                : [{ type: 'Cat', id: 'LIST' }],
    }),

    getCat: builder.query<Cat, number>({
        query: (id: number) => `cats/${id}/`,
        providesTags: (result: Cat | undefined, error: any, id: number) => {
            void result; void error
            return [{ type: 'Cat', id }]
        },
    }),

    createCat: builder.mutation<Cat, CatCreate>({
        query: (newCat: CatCreate) => ({
            url: 'cats/',
            method: 'POST',
            body: newCat,
        }),
        invalidatesTags: [{ type: 'Cat', id: 'LIST' }],
    }),

    updateCat: builder.mutation<Cat, { id: number; updates: CatUpdate }>({
        query: ({ id, updates }: { id: number; updates: CatUpdate }) => ({
            url: `cats/${id}/`,
            method: 'PATCH',
            body: updates,
        }),
        invalidatesTags: (result: Cat | undefined, error: any, { id }: { id: number }) => {
            void result; void error
            return [{ type: 'Cat', id }]
        },
    }),

    deleteCat: builder.mutation<void, number>({
        query: (id: number) => ({
            url: `cats/${id}/`,
            method: 'DELETE',
        }),
        invalidatesTags: (result: void | undefined, error: any, id: number) => {
            void result; void error
            return [
                { type: 'Cat', id },
                { type: 'Cat', id: 'LIST' },
            ]
        },
    }),
})
