import { IonPage, IonContent } from '@ionic/react'
import TopNavBar from '../design-system/top-nav-bar'
import { APP_MENU_ID } from '../routing/app-menu-id'

function WelcomeScreen() {
    return (
        <IonPage>
            <TopNavBar showBackButton={false} menuId={APP_MENU_ID} title="Home" />
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
                </IonContent>
        </IonPage>
    )
}

export default WelcomeScreen
