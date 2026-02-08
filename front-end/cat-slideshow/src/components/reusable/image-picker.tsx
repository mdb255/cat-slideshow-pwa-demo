import { useState } from 'react'
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react'
import BackButton from '../design-system/back-button'

interface ImagePickerProps {
    availableImageUrls: string[]
    selectedImageUrls: string[]
    onChange: (urls: string[]) => void
    maxSelection?: number
}

const FALLBACK_IMG =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EError%3C/text%3E%3C/svg%3E'

function ImagePicker({
    availableImageUrls,
    selectedImageUrls,
    onChange,
    maxSelection,
}: ImagePickerProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [tempSelection, setTempSelection] = useState<string[]>([])

    const handleOpen = () => {
        setTempSelection([...selectedImageUrls])
        setDialogOpen(true)
    }

    const handleUse = () => {
        onChange(tempSelection)
        setDialogOpen(false)
    }

    const handleCancel = () => {
        setTempSelection([])
        setDialogOpen(false)
    }

    const handleToggleImage = (url: string) => {
        setTempSelection((prev) => {
            const isSelected = prev.includes(url)
            if (isSelected) {
                return prev.filter((u) => u !== url)
            }
            if (maxSelection && prev.length >= maxSelection) {
                return prev
            }
            return [...prev, url]
        })
    }

    return (
        <>
            <div className="flex items-center justify-between p-4 border border-solid border-gray-300 rounded-lg mt-4 mb-4">
                <span className="flex-grow text-sm">
                    {selectedImageUrls.length} {selectedImageUrls.length === 1 ? 'image' : 'images'} selected
                </span>
                <IonButton fill="clear" size="small" onClick={handleOpen} aria-label="open image picker">
                    Pick images
                </IonButton>
            </div>

            <IonModal isOpen={dialogOpen} onDidDismiss={handleCancel}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <BackButton onClick={handleCancel} tooltip="Cancel" />
                        </IonButtons>
                        <IonTitle className="ion-text-start">Pick images</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleUse}>
                                Use
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {availableImageUrls.length === 0 ? (
                        <div className="flex justify-center items-center min-h-[200px] text-secondary">
                            <p>No images available</p>
                        </div>
                    ) : (
                        <IonGrid className="py-4">
                            <IonRow className="gap-4">
                                {availableImageUrls.map((url) => {
                                    const isSelected = tempSelection.includes(url)
                                    const isDisabled =
                                        !!maxSelection &&
                                        tempSelection.length >= maxSelection &&
                                        !isSelected

                                    return (
                                        <IonCol
                                            key={url}
                                            size="6"
                                            sizeMd="4"
                                            className="relative cursor-pointer"
                                            onClick={() => !isDisabled && handleToggleImage(url)}
                                        >
                                            <div className="aspect-square rounded overflow-hidden bg-gray-100 relative">
                                                <img
                                                    src={url}
                                                    alt="Cat"
                                                    loading="lazy"
                                                    className="w-full h-full object-cover block"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = FALLBACK_IMG
                                                    }}
                                                />
                                                <div className="absolute top-1 right-1">
                                                    <IonCheckbox
                                                        checked={isSelected}
                                                        onIonChange={() => handleToggleImage(url)}
                                                        disabled={isDisabled}
                                                        className="bg-white/90 rounded"
                                                    />
                                                </div>
                                            </div>
                                        </IonCol>
                                    )
                                })}
                            </IonRow>
                        </IonGrid>
                    )}
                </IonContent>
            </IonModal>
        </>
    )
}

export default ImagePicker
