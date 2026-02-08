import { Route, Redirect, Switch } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import { useSelector } from 'react-redux'
import PlaySlideshowScreen from '../../components/play-slideshow-screen/play-slideshow-screen'
import CatsAdminScreen from '../../components/cats-admin-screen/cats-admin-screen'
import SlideshowsAdminScreen from '../../components/slideshows-admin-screen/slideshows-admin-screen'
import LoginScreen from '../../components/login-screen/login-screen'
import SignUpScreen from '../../components/sign-up-screen/sign-up-screen'
import TabsLayout from '../../components/routing/tabs-layout'
import { RouteTransition } from '../../components/routing/route-transition'
import { accessRoute } from '../../components/routing/access-route'
import { RootState } from '../../rtk/store'

function Router() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    return (
        <IonRouterOutlet>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() =>
                        isAuthenticated ? (
                            <Redirect to="/welcome" />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                {accessRoute({ path: '/login', exact: true, access: 'anonymous', element: <LoginScreen /> })}
                {accessRoute({ path: '/sign-up', exact: true, access: 'anonymous', element: <SignUpScreen /> })}
                {accessRoute({ path: '/play-slideshow/:id', exact: true, element: <RouteTransition><PlaySlideshowScreen /></RouteTransition> })}
                {accessRoute({ path: '/cats-admin', exact: true, element: <RouteTransition><CatsAdminScreen /></RouteTransition> })}
                {accessRoute({ path: '/slideshows-admin', exact: true, element: <RouteTransition><SlideshowsAdminScreen /></RouteTransition> })}
                <Route path="/" render={() => <TabsLayout />} />
            </Switch>
        </IonRouterOutlet>
    )
}

export default Router
