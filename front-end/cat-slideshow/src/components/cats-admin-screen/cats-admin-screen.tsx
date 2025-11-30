import { useState } from 'react'
import { Container, Typography, Box, IconButton, CircularProgress, Alert } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import TopNavBar from '../design-system/top-nav-bar'
import CatCard from './cat-card'
import EditCatDialog from './edit-cat-dialog'
import DeleteConfirmDialog from '../reusable/delete-confirm-dialog'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function CatsAdminScreen() {
    // Fetch cats
    const { data: cats, isLoading, error } = catSlideshowApi.useGetCatsQuery({})
    const [deleteCat] = catSlideshowApi.useDeleteCatMutation()

    // Dialog state
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
            } catch (error) {
                console.error('Failed to delete cat:', error)
            }
        }
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false)
        setCatIdToDelete(undefined)
    }

    const catToDelete = cats?.find(cat => cat.id === catIdToDelete)

    return (
        <>
            <TopNavBar>
                <IconButton
                    color="inherit"
                    aria-label="add cat"
                    onClick={handleAddCat}
                >
                    <AddIcon />
                </IconButton>
            </TopNavBar>
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Cats Admin
                    </Typography>

                    {isLoading && (
                        <Box sx={styles.loadingContainer}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={styles.alert}>
                            Failed to load cats. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && cats && cats.length === 0 && (
                        <Box sx={styles.emptyContainer}>
                            <Typography variant="body1" color="text.secondary">
                                No cats yet. Click the + button to add your first cat!
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !error && cats && cats.length > 0 && (
                        <Box sx={styles.catsListContainer}>
                            {cats.map(cat => (
                                <CatCard
                                    key={cat.id}
                                    cat={cat}
                                    onEdit={() => handleEditCat(cat.id)}
                                    onDelete={() => handleDeleteCat(cat.id)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>

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
        </>
    )
}

let styles = {
    container: {
        padding: theme.spacing(4),
    },
    contentBox: {
        marginTop: theme.spacing(4),
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(4),
    },
    alert: {
        marginTop: theme.spacing(2),
    },
    emptyContainer: {
        textAlign: 'center' as const,
        padding: theme.spacing(4),
    },
    catsListContainer: {
        marginTop: theme.spacing(4),
    },
}

styles = stylesWithLabels(styles, 'CatsAdminScreen')

export default CatsAdminScreen
