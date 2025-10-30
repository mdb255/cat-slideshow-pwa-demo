import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import type {
    Slideshow,
    SlideshowCreate,
    SlideshowUpdate,
    SlideshowsQueryParams,
    SlideshowsByCatParams,
    SearchSlideshowsParams,
} from './slideshow-model'

// Slideshow-specific endpoint definitions
export const getSlideshowEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
    getSlideshows: builder.query<Slideshow[], SlideshowsQueryParams>({
        query: (params: SlideshowsQueryParams) => ({
            url: 'slideshows',
            params,
        }),
        providesTags: (result: Slideshow[] | undefined) =>
            result
                ? [
                    ...result.map(({ id }) => ({ type: 'Slideshow' as const, id })),
                    { type: 'Slideshow', id: 'LIST' },
                ]
                : [{ type: 'Slideshow', id: 'LIST' }],
    }),

    getSlideshow: builder.query<Slideshow, number>({
        query: (id: number) => `slideshows/${id}`,
        providesTags: (result: Slideshow | undefined, error: any, id: number) => {
            void result; void error
            return [{ type: 'Slideshow', id }]
        },
    }),

    createSlideshow: builder.mutation<Slideshow, SlideshowCreate>({
        query: (newSlideshow: SlideshowCreate) => ({
            url: 'slideshows',
            method: 'POST',
            body: newSlideshow,
        }),
        invalidatesTags: [{ type: 'Slideshow', id: 'LIST' }],
    }),

    updateSlideshow: builder.mutation<Slideshow, { id: number; updates: SlideshowUpdate }>({
        query: ({ id, updates }: { id: number; updates: SlideshowUpdate }) => ({
            url: `slideshows/${id}`,
            method: 'PATCH',
            body: updates,
        }),
        invalidatesTags: (result: Slideshow | undefined, error: any, { id }: { id: number }) => {
            void result; void error
            return [{ type: 'Slideshow', id }]
        },
    }),

    deleteSlideshow: builder.mutation<void, number>({
        query: (id: number) => ({
            url: `slideshows/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result: void | undefined, error: any, id: number) => {
            void result; void error
            return [
                { type: 'Slideshow', id },
                { type: 'Slideshow', id: 'LIST' },
            ]
        },
    }),

    getSlideshowsByCat: builder.query<Slideshow[], SlideshowsByCatParams>({
        query: ({ cat_id, ...params }: SlideshowsByCatParams) => ({
            url: `slideshows/cat/${cat_id}`,
            params,
        }),
        providesTags: (result: Slideshow[] | undefined, error: any, { cat_id }: SlideshowsByCatParams) => {
            void result; void error
            return [
                { type: 'Slideshow', id: `BY_CAT_${cat_id}` },
            ]
        },
    }),

    searchSlideshows: builder.query<Slideshow[], SearchSlideshowsParams>({
        query: ({ search_term, ...params }: SearchSlideshowsParams) => ({
            url: `slideshows/search/${search_term}`,
            params,
        }),
        providesTags: (result: Slideshow[] | undefined, error: any, { search_term }: SearchSlideshowsParams) => {
            void result; void error
            return [
                { type: 'Slideshow', id: `SEARCH_${search_term}` },
            ]
        },
    }),
})
