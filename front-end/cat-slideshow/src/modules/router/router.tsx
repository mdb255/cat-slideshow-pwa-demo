import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import WelcomeScreen from '../../components/welcome-screen/welcome-screen'
import SetupDataScreen from '../../components/setup-data-screen/setup-data-screen'
import ViewSlideshowsScreen from '../../components/view-slideshows-screen/view-slideshows-screen'
import PlaySlideshowScreen from '../../components/play-slideshow-screen/play-slideshow-screen'
import CatsAdminScreen from '../../components/cats-admin-screen/cats-admin-screen'
import SlideshowsAdminScreen from '../../components/slideshows-admin-screen/slideshows-admin-screen'
import LoginScreen from '../../components/login-screen/login-screen'
import SignUpScreen from '../../components/sign-up-screen/sign-up-screen'
import { accessRoute } from '../../components/routing/access-route'
import { RouteTransition } from '../../components/routing/route-transition'
import { RootState } from '../../rtk/store'

function Router() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    return (
        <RouteTransition>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/welcome" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                {accessRoute({ path: '/login', access: 'anonymous', element: <LoginScreen /> })}
                {accessRoute({ path: '/sign-up', access: 'anonymous', element: <SignUpScreen /> })}
                {accessRoute({ path: '/welcome', element: <WelcomeScreen /> })}
                {accessRoute({ path: '/setup-data', element: <SetupDataScreen /> })}
                {accessRoute({ path: '/view-slideshows', element: <ViewSlideshowsScreen /> })}
                {accessRoute({ path: '/play-slideshow/:id', element: <PlaySlideshowScreen /> })}
                {accessRoute({ path: '/cats-admin', element: <CatsAdminScreen /> })}
                {accessRoute({ path: '/slideshows-admin', element: <SlideshowsAdminScreen /> })}
                <Route path="*" element={<div className="ion-padding">404 - Page Not Found</div>} />
            </Routes>
        </RouteTransition>
    )
}

export default Router
