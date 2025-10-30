import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
    isInitialized: boolean
    accessToken: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    accessToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.isAuthenticated = true
            state.accessToken = action.payload.accessToken
        },
        setInitialized: (state) => {
            state.isInitialized = true
        },
        clearAuth: (state) => {
            state.isAuthenticated = false
            state.accessToken = null
        },
    },
})

export const { setAuthenticated, setInitialized, clearAuth } = authSlice.actions
export default authSlice.reducer
