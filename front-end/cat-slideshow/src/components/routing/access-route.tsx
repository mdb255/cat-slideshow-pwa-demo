import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { RootState } from '../../rtk/store'
import { ReactElement, ReactNode } from 'react'

type AccessMode = 'authenticated' | 'anonymous'

type AccessRouteConfig = {
    path?: string
    element?: ReactNode
    children?: ReactNode
    access?: AccessMode
}

// Factory function that returns a real <Route> element; safe to place inside <Routes>
export function accessRoute({ access = 'authenticated', element, children, ...rest }: AccessRouteConfig): ReactElement {
    // Note: this hook must be called inside a component; wrap in an inline component
    function Guarded(): ReactElement {
        const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth)
        const content = element ?? children

        if (!isInitialized) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <CircularProgress size={60} />
                </Box>
            ) as ReactElement
        }

        if (access === 'authenticated' && !isAuthenticated) {
            return <Navigate to="/login" replace /> as ReactElement
        }
        if (access === 'anonymous' && isAuthenticated) {
            return <Navigate to="/welcome" replace /> as ReactElement
        }
        return <>{content}</> as ReactElement
    }

    return <Route {...rest} element={<Guarded />} />
}

export type { AccessRouteConfig, AccessMode }


