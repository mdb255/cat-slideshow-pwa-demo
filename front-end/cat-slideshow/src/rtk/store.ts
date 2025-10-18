import { configureStore } from '@reduxjs/toolkit'
import { catSlideshowApi } from './api/catSlideshowApi'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [catSlideshowApi.reducerPath]: catSlideshowApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catSlideshowApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

