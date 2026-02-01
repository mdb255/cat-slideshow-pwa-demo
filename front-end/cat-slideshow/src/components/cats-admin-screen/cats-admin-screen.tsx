import { useState } from 'react'
import { IonPage, IonContent, IonSpinner, IonText, IonButton, IonIcon } from '@ionic/react'
import { add } from 'ionicons/icons'
import TopNavBar from '../design-system/top-nav-bar'
import CatCard from './cat-card'
import EditCatDialog from './edit-cat-dialog'
import DeleteConfirmDialog from '../reusable/delete-confirm-dialog'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

function CatsAdminScreen() {
    const { data: cats, isLoading, error } = catSlideshowApi.useGetCatsQuery({})
    const [deleteCat] = catSlideshowApi.useDeleteCatMutation()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [catIdToEdit, setCatIdToEdit] = useState<number | undefined>(undefined)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [catIdToDelete, setCatIdToDelete] = useState<number | undefined>(undefined)

    const handleAddCat = () => {
        setCatIdToEdit(undefined)
        setEditDialogOpen(true)
    }

    const handleEditCat = (catId: number) => {
        setCatIdToEdit(catId)
        setEditDialogOpen(true)
    }

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false)
        setCatIdToEdit(undefined)
    }

    const handleDeleteCat = (catId: number) => {
        setCatIdToDelete(catId)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (catIdToDelete !== undefined) {
            try {
                await deleteCat(catIdToDelete).unwrap()
                setDeleteDialogOpen(false)
                setCatIdToDelete(undefined)
            } catch (err) {
                console.error('Failed to delete cat:', err)
            }
        }
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false)
        setCatIdToDelete(undefined)
    }

    const catToDelete = cats?.find((cat) => cat.id === catIdToDelete)

    return (
        <IonPage>
            <TopNavBar>
                <IonButton fill="clear" color="light" onClick={handleAddCat} aria-label="add cat">
                    <IonIcon icon={add} />
                </IonButton>
            </TopNavBar>
            <IonContent className="ion-padding">
                <div className="mt-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-4">Cats Admin</h1>

                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <IonSpinner name="crescent" />
                        </div>
                    )}

                    {error && (
                        <IonText color="danger" className="block mt-4">
                            <p>Failed to load cats. Please try again.</p>
                        </IonText>
                    )}

                    {!isLoading && !error && cats && cats.length === 0 && (
                        <div className="text-center py-8 text-secondary">
                            <p>No cats yet. Click the + button to add your first cat!</p>
                        </div>
                    )}

                    {!isLoading && !error && cats && cats.length > 0 && (
                        <div className="mt-6 space-y-0">
                            {cats.map((cat) => (
                                <CatCard
                                    key={cat.id}
                                    cat={cat}
                                    onEdit={() => handleEditCat(cat.id)}
                                    onDelete={() => handleDeleteCat(cat.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </IonContent>

            <EditCatDialog
                open={editDialogOpen}
                catId={catIdToEdit}
                onClose={handleCloseEditDialog}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                itemName={catToDelete?.name || ''}
                itemType="Cat"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </IonPage>
    )
}

export default CatsAdminScreen
