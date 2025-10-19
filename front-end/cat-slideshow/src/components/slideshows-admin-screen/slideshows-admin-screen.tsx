import { useState } from 'react'
import { Container, Typography, Box, IconButton, CircularProgress, Alert } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import TopNavBar from '../design-system/top-nav-bar'
import SlideshowCard from './slideshow-card'
import EditSlideshowDialog from './edit-slideshow-dialog'
import DeleteConfirmDialog from '../reusable/delete-confirm-dialog'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function SlideshowsAdminScreen() {
    // Fetch slideshows
    const { data: slideshows, isLoading, error } = catSlideshowApi.useGetSlideshowsQuery({})
    const [deleteSlideshow] = catSlideshowApi.useDeleteSlideshowMutation()

    // Dialog state
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
            } catch (error) {
                console.error('Failed to delete slideshow:', error)
            }
        }
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false)
        setSlideshowIdToDelete(undefined)
    }

    const slideshowToDelete = slideshows?.find(slideshow => slideshow.id === slideshowIdToDelete)

    return (
        <>
            <TopNavBar>
                <IconButton
                    color="inherit"
                    aria-label="add slideshow"
                    onClick={handleAddSlideshow}
                >
                    <AddIcon />
                </IconButton>
            </TopNavBar>
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Slideshows Admin
                    </Typography>

                    {isLoading && (
                        <Box sx={styles.loadingContainer}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={styles.alert}>
                            Failed to load slideshows. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length === 0 && (
                        <Box sx={styles.emptyContainer}>
                            <Typography variant="body1" color="text.secondary">
                                No slideshows yet. Click the + button to add your first slideshow!
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length > 0 && (
                        <Box sx={styles.slideshowsListContainer}>
                            {slideshows.map(slideshow => (
                                <SlideshowCard
                                    key={slideshow.id}
                                    slideshow={slideshow}
                                    onEdit={() => handleEditSlideshow(slideshow.id)}
                                    onDelete={() => handleDeleteSlideshow(slideshow.id)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>

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
    slideshowsListContainer: {
        marginTop: theme.spacing(4),
    },
}

styles = stylesWithLabels(styles, 'SlideshowsAdminScreen')

export default SlideshowsAdminScreen
