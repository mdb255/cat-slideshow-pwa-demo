import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import TopNavBar from '../design-system/top-nav-bar'
import { clearAuth } from '../../rtk/auth/auth-slice'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

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
        <IonPage>
            <TopNavBar showBackButton={false}>
                <IonButton
                    fill="clear"
                    color="light"
                    id="profile-trigger"
                    aria-label="Profile"
                >
                    <IonIcon icon={personCircle} />
                </IonButton>
            </TopNavBar>
            <IonPopover trigger="profile-trigger">
                <IonList>
                    <IonItem button onClick={handleLogout}>
                        <IonLabel>Log Out</IonLabel>
                    </IonItem>
                </IonList>
            </IonPopover>
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
    )
}

export default WelcomeScreen
