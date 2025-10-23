import { createSlice } from '@reduxjs/toolkit'
import { catSlideshowApi } from '../cat-slideshow-api'

// Cat Image slice state interface - only data, no UI state
export interface CatImageState {
    // Array of image URLs
    imageUrls: string[]
}

// Initial state
const initialState: CatImageState = {
    imageUrls: [],
}

// Cat Image slice
export const catImageSlice = createSlice({
    name: 'catImages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getCatImages query success
            .addMatcher(
                catSlideshowApi.endpoints.getCatImages.matchFulfilled,
                (state, action) => {
                    state.imageUrls = action.payload
                }
            )
    },
})

// Export reducer
export default catImageSlice.reducer

// Selectors
export const selectCatImageUrls = (state: { catImages: CatImageState }) => state.catImages.imageUrls

