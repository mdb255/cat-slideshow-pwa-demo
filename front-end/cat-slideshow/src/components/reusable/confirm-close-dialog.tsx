import { IonAlert } from '@ionic/react'

interface ConfirmCloseDialogProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
}

function ConfirmCloseDialog({ open, onConfirm, onCancel }: ConfirmCloseDialogProps) {
    return (
        <IonAlert
            isOpen={open}
            onDidDismiss={() => onCancel()}
            header="Discard Changes?"
            message="You have unsaved changes. Are you sure you want to discard them?"
            buttons={[
                { text: 'Cancel', role: 'cancel', handler: () => onCancel() },
                { text: 'Discard', role: 'destructive', handler: () => onConfirm() },
            ]}
        />
    )
}

export default ConfirmCloseDialog
