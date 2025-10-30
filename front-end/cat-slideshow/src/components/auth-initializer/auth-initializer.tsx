import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { setAuthenticated, setInitialized, clearAuth } from '../../rtk/auth/auth-slice'
import { RootState } from '../../rtk/store'
import { ReactNode, useRef } from 'react'

interface AuthInitializerProps {
    children: ReactNode
}

function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useDispatch()
    const { isInitialized } = useSelector((state: RootState) => state.auth)

    const [resume] = catSlideshowApi.useResumeMutation()
    const hasInitializedRef = useRef(false)

    useEffect(() => {
        if (hasInitializedRef.current) {
            return
        }
        hasInitializedRef.current = true

        const initializeAuth = async () => {
            try {
                // Attempt to resume session using cookie
                const result = await resume().unwrap()
                dispatch(setAuthenticated({ accessToken: result.access_token }))
            } catch (error) {
                // No valid session cookie, user needs to log in
                dispatch(clearAuth())
            } finally {
                dispatch(setInitialized())
            }
        }

        initializeAuth()
    }, [dispatch, resume])

    if (!isInitialized) {
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress size={60} />
            </Box>
        )
    }

    return <>{children}</>
}

let styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
}

export default AuthInitializer
