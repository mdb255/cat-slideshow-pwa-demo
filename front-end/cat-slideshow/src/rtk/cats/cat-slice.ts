import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Cat } from './cat-model'
import { catSlideshowApi } from '../api/catSlideshowApi'

// Cat slice state interface - only data, no UI state
export interface CatState {
    // Normalized cat data by ID
    catsById: Record<number, Cat>
}

// Initial state
const initialState: CatState = {
    catsById: {},
}

// Cat slice
export const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        // // Manual actions for local state management if needed
        // addCat: (state, action: PayloadAction<Cat>) => {
        //     const cat = action.payload
        //     state.catsById[cat.id] = cat
        // },

        // updateCat: (state, action: PayloadAction<Cat>) => {
        //     const cat = action.payload
        //     state.catsById[cat.id] = cat
        // },

        // removeCat: (state, action: PayloadAction<number>) => {
        //     const catId = action.payload
        //     delete state.catsById[catId]
        // },

        // clearCats: (state) => {
        //     state.catsById = {}
        // },
    },
    extraReducers: (builder) => {
        builder
            // Handle getCats query success
            .addMatcher(
                catSlideshowApi.endpoints.getCats.matchFulfilled,
                (state, action) => {
                    const cats = action.payload
                    cats.forEach(cat => {
                        state.catsById[cat.id] = cat
                    })
                }
            )

            // Handle getCat query success
            .addMatcher(
                catSlideshowApi.endpoints.getCat.matchFulfilled,
                (state, action) => {
                    const cat = action.payload
                    state.catsById[cat.id] = cat
                }
            )

            // Handle createCat mutation success
            .addMatcher(
                catSlideshowApi.endpoints.createCat.matchFulfilled,
                (state, action) => {
                    const cat = action.payload
                    state.catsById[cat.id] = cat
                }
            )

            // Handle updateCat mutation success
            .addMatcher(
                catSlideshowApi.endpoints.updateCat.matchFulfilled,
                (state, action) => {
                    const cat = action.payload
                    state.catsById[cat.id] = cat
                }
            )

            // Handle deleteCat mutation success
            .addMatcher(
                catSlideshowApi.endpoints.deleteCat.matchFulfilled,
                (state, action) => {
                    // The API doesn't return the deleted cat, so we need to track it differently
                    // For now, we'll rely on cache invalidation to refetch data
                    // This could be enhanced by storing the deleted ID in the action meta
                }
            )
    },
})

// // Export actions
// export const {
//     addCat,
//     updateCat,
//     removeCat,
//     clearCats,
// } = catSlice.actions

// Export reducer
export default catSlice.reducer

// Selectors
export const selectCatsById = (state: { cats: CatState }) => state.cats.catsById

// Derived selectors
export const selectCats = (state: { cats: CatState }) =>
    Object.values(state.cats.catsById)

export const selectCatById = (state: { cats: CatState }, catId: number) =>
    state.cats.catsById[catId]

export const selectCatsCount = (state: { cats: CatState }) =>
    Object.keys(state.cats.catsById).length