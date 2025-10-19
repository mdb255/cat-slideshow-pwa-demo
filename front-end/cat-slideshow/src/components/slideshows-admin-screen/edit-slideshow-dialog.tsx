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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import type { SlideshowCreate, SlideshowUpdate } from '../../rtk/slideshows/slideshow-model'
import ConfirmCloseDialog from '../reusable/confirm-close-dialog'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface EditSlideshowDialogProps {
    open: boolean
    slideshowId?: number
    onClose: () => void
}

function EditSlideshowDialog({ open, slideshowId, onClose }: EditSlideshowDialogProps) {
    const isEditMode = slideshowId !== undefined

    // RTK Query hooks
    const { data: slideshow, isLoading: isLoadingSlideshow } = catSlideshowApi.useGetSlideshowQuery(slideshowId!, {
        skip: !isEditMode,
    })
    const { data: cats, isLoading: isLoadingCats } = catSlideshowApi.useGetCatsQuery({})
    const [createSlideshow, { isLoading: isCreating }] = catSlideshowApi.useCreateSlideshowMutation()
    const [updateSlideshow, { isLoading: isUpdating }] = catSlideshowApi.useUpdateSlideshowMutation()

    // Form state
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [catId, setCatId] = useState<number | ''>('')
    const [imageUrl1, setImageUrl1] = useState('')
    const [imageUrl2, setImageUrl2] = useState('')
    const [imageUrl3, setImageUrl3] = useState('')

    // Track if form is dirty
    const [isDirty, setIsDirty] = useState(false)
    const [showConfirmClose, setShowConfirmClose] = useState(false)

    // Initialize form when dialog opens or slideshow data loads
    useEffect(() => {
        if (open) {
            if (isEditMode && slideshow) {
                setTitle(slideshow.title)
                setDescription(slideshow.description || '')
                setCatId(slideshow.cat_id)
                setImageUrl1(slideshow.image_urls[0] || '')
                setImageUrl2(slideshow.image_urls[1] || '')
                setImageUrl3(slideshow.image_urls[2] || '')
                setIsDirty(false)
            } else if (!isEditMode) {
                // Reset form for create mode
                setTitle('')
                setDescription('')
                setCatId('')
                setImageUrl1('')
                setImageUrl2('')
                setImageUrl3('')
                setIsDirty(false)
            }
        }
    }, [open, isEditMode, slideshow])

    const handleFieldChange = (setter: (value: string) => void) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value)
        setIsDirty(true)
    }

    const handleCatChange = (e: any) => {
        setCatId(e.target.value)
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
            // Filter out empty image URLs
            const imageUrls = [imageUrl1, imageUrl2, imageUrl3].filter(url => url.trim() !== '')

            const slideshowData: SlideshowCreate | SlideshowUpdate = {
                title,
                description: description || undefined,
                cat_id: catId as number,
                image_urls: imageUrls,
            }

            if (isEditMode) {
                await updateSlideshow({ id: slideshowId, updates: slideshowData }).unwrap()
            } else {
                await createSlideshow(slideshowData as SlideshowCreate).unwrap()
            }

            setIsDirty(false)
            onClose()
        } catch (error) {
            console.error('Failed to save slideshow:', error)
        }
    }

    const isLoading = isLoadingSlideshow || isLoadingCats || isCreating || isUpdating
    const canSubmit = title.trim() !== '' && catId !== '' && !isLoading

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditMode ? 'Edit Slideshow' : 'Create Slideshow'}</DialogTitle>
                <DialogContent>
                    {isLoadingSlideshow || isLoadingCats ? (
                        <Box sx={styles.loadingContainer}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={styles.formContainer}>
                            <TextField
                                autoFocus
                                required
                                label="Title"
                                fullWidth
                                value={title}
                                onChange={handleFieldChange(setTitle)}
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={description}
                                onChange={handleFieldChange(setDescription)}
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="cat-select-label">Cat</InputLabel>
                                <Select
                                    labelId="cat-select-label"
                                    value={catId}
                                    label="Cat"
                                    onChange={handleCatChange}
                                >
                                    {cats?.map(cat => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Image URL 1"
                                fullWidth
                                value={imageUrl1}
                                onChange={handleFieldChange(setImageUrl1)}
                                margin="normal"
                                placeholder="https://example.com/image1.jpg"
                            />
                            <TextField
                                label="Image URL 2"
                                fullWidth
                                value={imageUrl2}
                                onChange={handleFieldChange(setImageUrl2)}
                                margin="normal"
                                placeholder="https://example.com/image2.jpg"
                            />
                            <TextField
                                label="Image URL 3"
                                fullWidth
                                value={imageUrl3}
                                onChange={handleFieldChange(setImageUrl3)}
                                margin="normal"
                                placeholder="https://example.com/image3.jpg"
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

styles = stylesWithLabels(styles, 'EditSlideshowDialog')

export default EditSlideshowDialog

