import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

interface ConfirmCloseDialogProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
}

function ConfirmCloseDialog({ open, onConfirm, onCancel }: ConfirmCloseDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Discard Changes?</DialogTitle>
            <DialogContent>
                You have unsaved changes. Are you sure you want to discard them?
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color="error">
                    Discard
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmCloseDialog

