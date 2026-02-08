import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonList,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
} from '@ionic/react'
import { menu, power } from 'ionicons/icons'
import TopNavBar from '../design-system/top-nav-bar'
import { clearAuth } from '../../rtk/auth/auth-slice'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

const WELCOME_MENU_ID = 'welcome-menu'
const WELCOME_CONTENT_ID = 'welcome-content'

function WelcomeScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [logoutTrigger] = catSlideshowApi.useLogoutMutation()

    const handleSetupDataClick = () => {
        navigate('/setup-data')
    }

    const handleViewSlideshowsClick = () => {
        navigate('/view-slideshows')
    }

    const handleLogout = async () => {
        try {
            await logoutTrigger().unwrap()
        } catch {
            // proceed to clear auth regardless; backend may already have invalidated session
        } finally {
            dispatch(clearAuth())
            navigate('/login')
        }
    }

    return (
        <>
            <IonMenu
                contentId={WELCOME_CONTENT_ID}
                menuId={WELCOME_MENU_ID}
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
            <IonPage id={WELCOME_CONTENT_ID}>
                <TopNavBar
                    showBackButton={false}
                    startContent={
                        <IonMenuToggle menu={WELCOME_MENU_ID}>
                            <IonButton
                                fill="clear"
                                color="light"
                                aria-label="Menu"
                            >
                                <IonIcon icon={menu} />
                            </IonButton>
                        </IonMenuToggle>
                    }
                />
                <IonContent className="ion-padding flex flex-col items-center justify-center text-center min-h-full">
                    <div className="max-w-lg w-full flex flex-col items-center gap-6 mb-8">
                        <h1 className="text-3xl font-semibold">
                            Welcome to Cat Slideshow Demo
                        </h1>
                        <img
                            src="https://cat-slideshow-demo.s3.us-east-1.amazonaws.com/cats_splash.png"
                            alt="Cat Slideshow Placeholder"
                            className="max-w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                        <IonButton
                            expand="block"
                            size="large"
                            fill="outline"
                            onClick={handleSetupDataClick}
                        >
                            Setup Data
                        </IonButton>
                        <IonButton
                            expand="block"
                            size="large"
                            onClick={handleViewSlideshowsClick}
                        >
                            View Slideshows
                        </IonButton>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default WelcomeScreen
