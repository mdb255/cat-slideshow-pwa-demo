import { IonHeader, IonToolbar, IonButtons } from '@ionic/react'
import { ReactNode } from 'react'
import BackButton from './back-button'

interface TopNavBarProps {
    children?: ReactNode
    showBackButton?: boolean
}

function TopNavBar({ children, showBackButton = true }: TopNavBarProps) {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                {showBackButton && (
                    <IonButtons slot="start">
                        <BackButton />
                    </IonButtons>
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
