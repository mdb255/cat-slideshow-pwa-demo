import { configureStore } from '@reduxjs/toolkit'
import { catSlideshowApi } from './cat-slideshow-api'
import catSlice from './cats/cat-slice'
import slideshowSlice from './slideshows/slideshow-slice'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [catSlideshowApi.reducerPath]: catSlideshowApi.reducer,
        cats: catSlice,
        slideshows: slideshowSlice,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catSlideshowApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

