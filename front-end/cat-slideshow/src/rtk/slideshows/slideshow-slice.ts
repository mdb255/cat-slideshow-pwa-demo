import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Slideshow } from './slideshow-model'
import { catSlideshowApi } from '../cat-slideshow-api'

// Slideshow slice state interface - only data, no UI state
export interface SlideshowState {
    // Normalized slideshow data by ID
    slideshowsById: Record<number, Slideshow>
}

// Initial state
const initialState: SlideshowState = {
    slideshowsById: {},
}

// Slideshow slice
export const slideshowSlice = createSlice({
    name: 'slideshows',
    initialState,
    reducers: {
        // // Manual actions for local state management if needed
        // addSlideshow: (state, action: PayloadAction<Slideshow>) => {
        //     const slideshow = action.payload
        //     state.slideshowsById[slideshow.id] = slideshow
        // },

        // updateSlideshow: (state, action: PayloadAction<Slideshow>) => {
        //     const slideshow = action.payload
        //     state.slideshowsById[slideshow.id] = slideshow
        // },

        // removeSlideshow: (state, action: PayloadAction<number>) => {
        //     const slideshowId = action.payload
        //     delete state.slideshowsById[slideshowId]
        // },

        // clearSlideshows: (state) => {
        //     state.slideshowsById = {}
        // },
    },
    extraReducers: (builder) => {
        builder
            // Handle getSlideshows query success
            .addMatcher(
                catSlideshowApi.endpoints.getSlideshows.matchFulfilled,
                (state, action) => {
                    const slideshows = action.payload
                    slideshows.forEach(slideshow => {
                        state.slideshowsById[slideshow.id] = slideshow
                    })
                }
            )

            // Handle getSlideshow query success
            .addMatcher(
                catSlideshowApi.endpoints.getSlideshow.matchFulfilled,
                (state, action) => {
                    const slideshow = action.payload
                    state.slideshowsById[slideshow.id] = slideshow
                }
            )

            // Handle createSlideshow mutation success
            .addMatcher(
                catSlideshowApi.endpoints.createSlideshow.matchFulfilled,
                (state, action) => {
                    const slideshow = action.payload
                    state.slideshowsById[slideshow.id] = slideshow
                }
            )

            // Handle updateSlideshow mutation success
            .addMatcher(
                catSlideshowApi.endpoints.updateSlideshow.matchFulfilled,
                (state, action) => {
                    const slideshow = action.payload
                    state.slideshowsById[slideshow.id] = slideshow
                }
            )

            // Handle deleteSlideshow mutation success
            .addMatcher(
                catSlideshowApi.endpoints.deleteSlideshow.matchFulfilled,
                (state, action) => {
                    const slideshowId = action.meta.arg.originalArgs;
                    if (slideshowId) {
                        delete state.slideshowsById[slideshowId];
                    }
                }
            )

            // Handle getSlideshowsByCat query success
            .addMatcher(
                catSlideshowApi.endpoints.getSlideshowsByCat.matchFulfilled,
                (state, action) => {
                    const slideshows = action.payload
                    slideshows.forEach(slideshow => {
                        state.slideshowsById[slideshow.id] = slideshow
                    })
                }
            )

            // Handle searchSlideshows query success
            .addMatcher(
                catSlideshowApi.endpoints.searchSlideshows.matchFulfilled,
                (state, action) => {
                    const slideshows = action.payload
                    slideshows.forEach(slideshow => {
                        state.slideshowsById[slideshow.id] = slideshow
                    })
                }
            )
    },
})

// // Export actions
// export const {
//     addSlideshow,
//     updateSlideshow,
//     removeSlideshow,
//     clearSlideshows,
// } = slideshowSlice.actions

// Export reducer
export default slideshowSlice.reducer

// Selectors
export const selectSlideshowsById = (state: { slideshows: SlideshowState }) => state.slideshows.slideshowsById

// Derived selectors
export const selectSlideshows = (state: { slideshows: SlideshowState }) =>
    Object.values(state.slideshows.slideshowsById)

export const selectSlideshowById = (state: { slideshows: SlideshowState }, slideshowId: number) =>
    state.slideshows.slideshowsById[slideshowId]

export const selectSlideshowsCount = (state: { slideshows: SlideshowState }) =>
    Object.keys(state.slideshows.slideshowsById).length

// Helper selectors for filtered data
export const selectSlideshowsByCat = (state: { slideshows: SlideshowState }, catId: number) =>
    Object.values(state.slideshows.slideshowsById).filter(slideshow => slideshow.cat_id === catId)

export const selectSlideshowsBySearchTerm = (state: { slideshows: SlideshowState }, searchTerm: string) =>
    Object.values(state.slideshows.slideshowsById).filter(slideshow =>
        slideshow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slideshow.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )