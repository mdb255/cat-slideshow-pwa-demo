import { Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
} from '@ionic/react'
import { home, homeOutline, create, createOutline, eye, eyeOutline, power } from 'ionicons/icons'
import WelcomeScreen from '../welcome-screen/welcome-screen'
import AuthorDataScreen from '../author-data-screen/author-data-screen'
import ViewSlideshowsScreen from '../view-slideshows-screen/view-slideshows-screen'
import { RouteTransition } from './route-transition'
import { clearAuth } from '../../rtk/auth/auth-slice'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { APP_MENU_ID } from './app-menu-id'

const TABS_CONTENT_ID = 'tabs-content'

function TabsLayout() {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const [logoutTrigger] = catSlideshowApi.useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutTrigger().unwrap()
        } catch {
            // proceed to clear auth regardless; backend may already have invalidated session
        } finally {
            dispatch(clearAuth())
            history.push('/login')
        }
    }

    return (
        <>
            <IonMenu
                contentId={TABS_CONTENT_ID}
                menuId={APP_MENU_ID}
                type="overlay"
                side="start"
            >
                <IonHeader>
                    <IonToolbar />
                </IonHeader>
                <IonContent>
                    <IonList lines="none" className="py-2">
                        <IonItem
                            button
                            onClick={handleLogout}
                            detail={false}
                        >
                            <IonIcon
                                icon={power}
                                slot="start"
                                className="text-[20px] shrink-0 me-3 w-5 h-5"
                            />
                            <IonLabel>Log Out</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonTabs>
                <IonRouterOutlet id={TABS_CONTENT_ID}>
                    <Redirect exact path="/" to="/welcome" />
                    <Route
                        exact
                        path="/welcome"
                        render={() => (
                            <RouteTransition routeKey="/welcome">
                                <WelcomeScreen />
                            </RouteTransition>
                        )}
                    />
                    <Route
                        exact
                        path="/author-data"
                        render={() => (
                            <RouteTransition routeKey="/author-data">
                                <AuthorDataScreen />
                            </RouteTransition>
                        )}
                    />
                    <Route
                        exact
                        path="/view-slideshows"
                        render={() => (
                            <RouteTransition routeKey="/view-slideshows">
                                <ViewSlideshowsScreen />
                            </RouteTransition>
                        )}
                    />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/welcome">
                        <IonIcon icon={location.pathname === '/welcome' ? home : homeOutline} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="author" href="/author-data">
                        <IonIcon icon={location.pathname === '/author-data' ? create : createOutline} />
                        <IonLabel>Author</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="view" href="/view-slideshows">
                        <IonIcon icon={location.pathname === '/view-slideshows' ? eye : eyeOutline} />
                        <IonLabel>View</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>
    )
}

export default TabsLayout
