import { IonHeader, IonToolbar, IonButtons } from '@ionic/react'
import { ReactNode } from 'react'
import BackButton from './back-button'

interface TopNavBarProps {
    children?: ReactNode
    showBackButton?: boolean
    startContent?: ReactNode
}

function TopNavBar({
    children,
    showBackButton = true,
    startContent,
}: TopNavBarProps) {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                {showBackButton ? (
                    <IonButtons slot="start">
                        <BackButton />
                    </IonButtons>
                ) : (
                    startContent && (
                        <IonButtons slot="start">{startContent}</IonButtons>
                    )
                )}
                {children && (
                    <IonButtons slot="end" className="flex items-center gap-1">
                        {children}
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    )
}

export default TopNavBar
