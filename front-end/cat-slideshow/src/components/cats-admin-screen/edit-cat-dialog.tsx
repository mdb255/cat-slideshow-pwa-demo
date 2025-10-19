import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
    Box,
} from '@mui/material'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import type { CatCreate, CatUpdate } from '../../rtk/cats/cat-model'
import ConfirmCloseDialog from '../reusable/confirm-close-dialog'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface EditCatDialogProps {
    open: boolean
    catId?: number
    onClose: () => void
}

function EditCatDialog({ open, catId, onClose }: EditCatDialogProps) {
    const isEditMode = catId !== undefined

    // RTK Query hooks
    const { data: cat, isLoading: isLoadingCat } = catSlideshowApi.useGetCatQuery(catId!, {
        skip: !isEditMode,
    })
    const [createCat, { isLoading: isCreating }] = catSlideshowApi.useCreateCatMutation()
    const [updateCat, { isLoading: isUpdating }] = catSlideshowApi.useUpdateCatMutation()

    // Form state
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [color, setColor] = useState('')
    const [description, setDescription] = useState('')

    // Track if form is dirty
    const [isDirty, setIsDirty] = useState(false)
    const [showConfirmClose, setShowConfirmClose] = useState(false)

    // Initialize form when dialog opens or cat data loads
    useEffect(() => {
        if (open) {
            if (isEditMode && cat) {
                setName(cat.name)
                setBreed(cat.breed || '')
                setAge(cat.age?.toString() || '')
                setColor(cat.color || '')
                setDescription(cat.description || '')
                setIsDirty(false)
            } else if (!isEditMode) {
                // Reset form for create mode
                setName('')
                setBreed('')
                setAge('')
                setColor('')
                setDescription('')
                setIsDirty(false)
            }
        }
    }, [open, isEditMode, cat])

    const handleFieldChange = (setter: (value: string) => void) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value)
        setIsDirty(true)
    }

    const handleClose = () => {
        if (isDirty) {
            setShowConfirmClose(true)
        } else {
            onClose()
        }
    }

    const handleConfirmClose = () => {
        setShowConfirmClose(false)
        onClose()
    }

    const handleCancelClose = () => {
        setShowConfirmClose(false)
    }

    const handleSubmit = async () => {
        try {
            const catData: CatCreate | CatUpdate = {
                name,
                breed: breed || undefined,
                age: age ? parseInt(age, 10) : undefined,
                color: color || undefined,
                description: description || undefined,
            }

            if (isEditMode) {
                await updateCat({ id: catId, updates: catData }).unwrap()
            } else {
                await createCat(catData as CatCreate).unwrap()
            }

            setIsDirty(false)
            onClose()
        } catch (error) {
            console.error('Failed to save cat:', error)
        }
    }

    const isLoading = isLoadingCat || isCreating || isUpdating
    const canSubmit = name.trim() !== '' && !isLoading

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditMode ? 'Edit Cat' : 'Create Cat'}</DialogTitle>
                <DialogContent>
                    {isLoadingCat ? (
                        <Box sx={styles.loadingContainer}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={styles.formContainer}>
                            <TextField
                                autoFocus
                                required
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={handleFieldChange(setName)}
                                margin="normal"
                            />
                            <TextField
                                label="Breed"
                                fullWidth
                                value={breed}
                                onChange={handleFieldChange(setBreed)}
                                margin="normal"
                            />
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                value={age}
                                onChange={handleFieldChange(setAge)}
                                margin="normal"
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                label="Color"
                                fullWidth
                                value={color}
                                onChange={handleFieldChange(setColor)}
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={handleFieldChange(setDescription)}
                                margin="normal"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!canSubmit}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : isEditMode ? (
                            'Save'
                        ) : (
                            'Create'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmCloseDialog
                open={showConfirmClose}
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    )
}

let styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4),
    },
    formContainer: {
        paddingTop: theme.spacing(1),
    },
}

styles = stylesWithLabels(styles, 'EditCatDialog')

export default EditCatDialog

