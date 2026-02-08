import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/react'
import TopNavBar from '../design-system/top-nav-bar'
import { APP_MENU_ID } from '../routing/app-menu-id'

function AuthorDataScreen() {
    return (
        <IonPage>
            <TopNavBar showBackButton={false} menuId={APP_MENU_ID} title="Author Data" />
            <IonContent className="ion-padding">
                <IonList lines="full" className="max-w-4xl mx-auto">
                    <IonItem
                        button
                        routerLink="/cats-admin"
                        routerDirection="forward"
                        detail
                    >
                        <IonLabel>Cats Admin</IonLabel>
                    </IonItem>
                    <IonItem
                        button
                        routerLink="/slideshows-admin"
                        routerDirection="forward"
                        detail
                    >
                        <IonLabel>Slideshows Admin</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default AuthorDataScreen
