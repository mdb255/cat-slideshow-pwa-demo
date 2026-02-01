import { IonButton, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
    tooltip?: string
    onClick?: () => void
}

function BackButton({ tooltip = 'Go back', onClick }: BackButtonProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            navigate(-1)
        }
    }

    return (
        <IonButton
            fill="clear"
            color="light"
            onClick={handleClick}
            aria-label={tooltip}
        >
            <IonIcon icon={arrowBack} slot="start" />
        </IonButton>
    )
}

export default BackButton
