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
    IonButton,
    IonSpinner,
    IonButtons,
} from '@ionic/react'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import type { CatCreate, CatUpdate } from '../../rtk/cats/cat-model'
import ConfirmCloseDialog from '../reusable/confirm-close-dialog'

interface EditCatDialogProps {
    open: boolean
    catId?: number
    onClose: () => void
}

function EditCatDialog({ open, catId, onClose }: EditCatDialogProps) {
    const isEditMode = catId !== undefined

    const { data: cat, isLoading: isLoadingCat } = catSlideshowApi.useGetCatQuery(catId!, {
        skip: !isEditMode,
    })
    const [createCat, { isLoading: isCreating }] = catSlideshowApi.useCreateCatMutation()
    const [updateCat, { isLoading: isUpdating }] = catSlideshowApi.useUpdateCatMutation()

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [color, setColor] = useState('')
    const [description, setDescription] = useState('')
    const [isDirty, setIsDirty] = useState(false)
    const [showConfirmClose, setShowConfirmClose] = useState(false)

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
                setName('')
                setBreed('')
                setAge('')
                setColor('')
                setDescription('')
                setIsDirty(false)
            }
        }
    }, [open, isEditMode, cat])

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
        } catch (err) {
            console.error('Failed to save cat:', err)
        }
    }

    const isLoading = isLoadingCat || isCreating || isUpdating
    const canSubmit = name.trim() !== '' && !isLoading

    return (
        <>
            <IonModal isOpen={open} onDidDismiss={handleClose}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{isEditMode ? 'Edit Cat' : 'Create Cat'}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleClose} disabled={isLoading}>
                                Cancel
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {isLoadingCat ? (
                        <div className="flex justify-center items-center py-12">
                            <IonSpinner name="crescent" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <IonItem>
                                <IonLabel position="stacked">Name *</IonLabel>
                                <IonInput
                                    value={name}
                                    onIonInput={(e) => {
                                        setName((e.target as HTMLIonInputElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
                                    required
                                    autofocus
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Breed</IonLabel>
                                <IonInput
                                    value={breed}
                                    onIonInput={(e) => {
                                        setBreed((e.target as HTMLIonInputElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Age</IonLabel>
                                <IonInput
                                    type="number"
                                    value={age}
                                    onIonInput={(e) => {
                                        setAge((e.target as HTMLIonInputElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
                                    min={0}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Color</IonLabel>
                                <IonInput
                                    value={color}
                                    onIonInput={(e) => {
                                        setColor((e.target as HTMLIonInputElement).value as string ?? '')
                                        setIsDirty(true)
                                    }}
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
                                    rows={4}
                                />
                            </IonItem>
                            <div className="flex justify-end gap-2 mt-4">
                                <IonButton onClick={handleClose} disabled={isLoading}>
                                    Cancel
                                </IonButton>
                                <IonButton onClick={handleSubmit} disabled={!canSubmit}>
                                    {isLoading ? (
                                        <IonSpinner name="crescent" />
                                    ) : isEditMode ? (
                                        'Save'
                                    ) : (
                                        'Create'
                                    )}
                                </IonButton>
                            </div>
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

export default EditCatDialog
