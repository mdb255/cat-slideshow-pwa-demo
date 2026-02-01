import { useState } from 'react'
import { IonPage, IonContent, IonSpinner, IonText, IonButton, IonIcon } from '@ionic/react'
import { add } from 'ionicons/icons'
import TopNavBar from '../design-system/top-nav-bar'
import SlideshowCard from './slideshow-card'
import EditSlideshowDialog from './edit-slideshow-dialog'
import DeleteConfirmDialog from '../reusable/delete-confirm-dialog'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

function SlideshowsAdminScreen() {
    const { data: slideshows, isLoading, error } = catSlideshowApi.useGetSlideshowsQuery({})
    const [deleteSlideshow] = catSlideshowApi.useDeleteSlideshowMutation()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [slideshowIdToEdit, setSlideshowIdToEdit] = useState<number | undefined>(undefined)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [slideshowIdToDelete, setSlideshowIdToDelete] = useState<number | undefined>(undefined)

    const handleAddSlideshow = () => {
        setSlideshowIdToEdit(undefined)
        setEditDialogOpen(true)
    }

    const handleEditSlideshow = (slideshowId: number) => {
        setSlideshowIdToEdit(slideshowId)
        setEditDialogOpen(true)
    }

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false)
        setSlideshowIdToEdit(undefined)
    }

    const handleDeleteSlideshow = (slideshowId: number) => {
        setSlideshowIdToDelete(slideshowId)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (slideshowIdToDelete !== undefined) {
            try {
                await deleteSlideshow(slideshowIdToDelete).unwrap()
                setDeleteDialogOpen(false)
                setSlideshowIdToDelete(undefined)
            } catch (err) {
                console.error('Failed to delete slideshow:', err)
            }
        }
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false)
        setSlideshowIdToDelete(undefined)
    }

    const slideshowToDelete = slideshows?.find((s) => s.id === slideshowIdToDelete)

    return (
        <IonPage>
            <TopNavBar>
                <IonButton fill="clear" color="light" onClick={handleAddSlideshow} aria-label="add slideshow">
                    <IonIcon icon={add} />
                </IonButton>
            </TopNavBar>
            <IonContent className="ion-padding">
                <div className="mt-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-4">Slideshows Admin</h1>

                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <IonSpinner name="crescent" />
                        </div>
                    )}

                    {error && (
                        <IonText color="danger" className="block mt-4">
                            <p>Failed to load slideshows. Please try again.</p>
                        </IonText>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length === 0 && (
                        <div className="text-center py-8 text-secondary">
                            <p>No slideshows yet. Click the + button to add your first slideshow!</p>
                        </div>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length > 0 && (
                        <div className="mt-6 space-y-0">
                            {slideshows.map((slideshow) => (
                                <SlideshowCard
                                    key={slideshow.id}
                                    slideshow={slideshow}
                                    onEdit={() => handleEditSlideshow(slideshow.id)}
                                    onDelete={() => handleDeleteSlideshow(slideshow.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </IonContent>

            <EditSlideshowDialog
                open={editDialogOpen}
                slideshowId={slideshowIdToEdit}
                onClose={handleCloseEditDialog}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                itemName={slideshowToDelete?.title || ''}
                itemType="Slideshow"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </IonPage>
    )
}

export default SlideshowsAdminScreen
