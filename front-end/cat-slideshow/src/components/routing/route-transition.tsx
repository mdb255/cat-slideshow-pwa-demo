import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface RouteTransitionProps {
    children: ReactNode
}

/**
 * Wrapper component that applies fade transition on route changes
 */
export function RouteTransition({ children }: RouteTransitionProps) {
    const location = useLocation()

    return (
        <div key={location.pathname} className="route-transition">
            {children}
        </div>
    )
}
