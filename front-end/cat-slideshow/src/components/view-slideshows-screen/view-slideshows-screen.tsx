import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import TopNavBar from '../design-system/top-nav-bar'
import SlideshowCard from './slideshow-card'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function ViewSlideshowsScreen() {
    const navigate = useNavigate()

    // Fetch slideshows
    const { data: slideshows, isLoading, error } = catSlideshowApi.useGetSlideshowsQuery({})

    const handleSlideshowClick = (slideshowId: number) => {
        navigate(`/play-slideshow/${slideshowId}`)
    }

    return (
        <>
            <TopNavBar />
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        View Slideshows
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
                                No slideshows available. Create some in the admin section!
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length > 0 && (
                        <Box sx={styles.slideshowsListContainer}>
                            {slideshows.map(slideshow => (
                                <SlideshowCard
                                    key={slideshow.id}
                                    slideshow={slideshow}
                                    onClick={() => handleSlideshowClick(slideshow.id)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>
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

styles = stylesWithLabels(styles, 'ViewSlideshowsScreen')

export default ViewSlideshowsScreen

