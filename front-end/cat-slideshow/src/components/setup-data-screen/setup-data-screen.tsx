import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useNavigate } from 'react-router-dom'
import TopNavBar from '../design-system/top-nav-bar'

function SetupDataScreen() {
    const navigate = useNavigate()

    return (
        <IonPage>
            <TopNavBar />
            <IonContent className="ion-padding text-center">
                <div className="mt-16 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-8">Setup Data</h1>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <IonButton
                            size="large"
                            onClick={() => navigate('/cats-admin')}
                            className="min-w-[200px]"
                        >
                            Cats Admin
                        </IonButton>
                        <IonButton
                            size="large"
                            onClick={() => navigate('/slideshows-admin')}
                            className="min-w-[200px]"
                        >
                            Slideshows Admin
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default SetupDataScreen
