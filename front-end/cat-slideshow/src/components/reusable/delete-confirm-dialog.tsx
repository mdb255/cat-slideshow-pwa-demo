import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'

interface DeleteConfirmDialogProps {
    open: boolean
    itemName: string
    itemType?: string
    onConfirm: () => void
    onCancel: () => void
}

function DeleteConfirmDialog({
    open,
    itemName,
    itemType = 'item',
    onConfirm,
    onCancel
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Delete {itemType}?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmDialog

