import { Container, Typography, Box } from '@mui/material'
import TopNavBar from '../design-system/top-nav-bar'
import BackButton from '../design-system/back-button'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function SlideshowsAdminScreen() {
    return (
        <>
            <TopNavBar />
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Slideshows Admin
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This page will contain slideshow management functionality. (Coming Soon)
                    </Typography>
                    <BackButton />
                </Box>
            </Container>
        </>
    )
}

let styles = {
    container: {
        padding: theme.spacing(4),
        textAlign: 'center',
    },
    contentBox: {
        marginTop: theme.spacing(8),
    },
}

styles = stylesWithLabels(styles, 'SlideshowsAdminScreen')

export default SlideshowsAdminScreen
