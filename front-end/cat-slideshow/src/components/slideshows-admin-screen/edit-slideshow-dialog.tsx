import { useState, useEffect } from 'react'
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonSpinner,
    IonButtons,
} from '@ionic/react'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import type { SlideshowCreate, SlideshowUpdate } from '../../rtk/slideshows/slideshow-model'
import BackButton from '../design-system/back-button'
import ConfirmCloseDialog from '../reusable/confirm-close-dialog'
import ImagePicker from '../reusable/image-picker'

interface EditSlideshowDialogProps {
    open: boolean
    slideshowId?: number
    onClose: () => void
}

function EditSlideshowDialog({ open, slideshowId, onClose }: EditSlideshowDialogProps) {
    const isEditMode = slideshowId !== undefined

    const { data: slideshow, isLoading: isLoadingSlideshow } = catSlideshowApi.useGetSlideshowQuery(slideshowId!, {
        skip: !isEditMode,
    })
    const { data: cats, isLoading: isLoadingCats } = catSlideshowApi.useGetCatsQuery({})
    const { data: catImages, isLoading: isLoadingCatImages } = catSlideshowApi.useGetCatImagesQuery()
    const [createSlideshow, { isLoading: isCreating }] = catSlideshowApi.useCreateSlideshowMutation()
    const [updateSlideshow, { isLoading: isUpdating }] = catSlideshowApi.useUpdateSlideshowMutation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [catId, setCatId] = useState<number | ''>('')
    const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([])
    const [isDirty, setIsDirty] = useState(false)
    const [showConfirmClose, setShowConfirmClose] = useState(false)

    useEffect(() => {
        if (open) {
            if (isEditMode && slideshow) {
                setTitle(slideshow.title)
                setDescription(slideshow.description || '')
                setCatId(slideshow.cat_id)
                setSelectedImageUrls(slideshow.image_urls)
                setIsDirty(false)
            } else if (!isEditMode) {
                setTitle('')
                setDescription('')
                setCatId('')
                setSelectedImageUrls([])
                setIsDirty(false)
            }
        }
    }, [open, isEditMode, slideshow])

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
            const slideshowData: SlideshowCreate | SlideshowUpdate = {
                title,
                description: description || undefined,
                cat_id: catId as number,
                image_urls: selectedImageUrls,
            }

            if (isEditMode) {
                await updateSlideshow({ id: slideshowId, updates: slideshowData }).unwrap()
            } else {
                await createSlideshow(slideshowData as SlideshowCreate).unwrap()
            }

            setIsDirty(false)
            onClose()
        } catch (err) {
            console.error('Failed to save slideshow:', err)
        }
    }

    const handleImageUrlsChange = (urls: string[]) => {
        setSelectedImageUrls(urls)
        setIsDirty(true)
    }

    const isLoading = isLoadingSlideshow || isLoadingCats || isLoadingCatImages || isCreating || isUpdating
    const canSubmit = title.trim() !== '' && catId !== '' && !isLoading

    return (
        <>
            <IonModal isOpen={open} onDidDismiss={handleClose}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <BackButton onClick={handleClose} tooltip="Cancel" />
                        </IonButtons>
                        <IonTitle className="ion-text-start">{isEditMode ? 'Edit Slideshow' : 'Create Slideshow'}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleSubmit} disabled={!canSubmit}>
                                {isLoading ? (
                                    <IonSpinner name="crescent" />
                                ) : isEditMode ? (
                                    'Save'
                                ) : (
                                    'Create'
                                )}
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {isLoadingSlideshow || isLoadingCats ? (
                        <div className="flex justify-center items-center py-12">
                            <IonSpinner name="crescent" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <IonItem>
                                <IonLabel position="stacked">Title *</IonLabel>
                                <IonInput
                                    value={title}
                                    onIonInput={(e) => {
                                        setTitle((e.target as HTMLIonInputElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
                                    required
                                    autofocus
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Description</IonLabel>
                                <IonTextarea
                                    value={description}
                                    onIonInput={(e) => {
                                        setDescription((e.target as HTMLIonTextareaElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
                                    rows={3}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Cat *</IonLabel>
                                <IonSelect
                                    value={catId}
                                    onIonChange={(e) => {
                                        setCatId(e.detail.value as number)
                                        setIsDirty(true)
                                    }}
                                    placeholder="Select cat"
                                    interface="popover"
                                >
                                    {cats?.map((cat) => (
                                        <IonSelectOption key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                            <ImagePicker
                                availableImageUrls={catImages || []}
                                selectedImageUrls={selectedImageUrls}
                                onChange={handleImageUrlsChange}
                            />
                        </div>
                    )}
                </IonContent>
            </IonModal>

            <ConfirmCloseDialog
                open={showConfirmClose}
                onConfirm={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    )
}

export default EditSlideshowDialog
