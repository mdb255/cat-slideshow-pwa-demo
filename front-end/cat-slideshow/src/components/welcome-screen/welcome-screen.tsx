import { Box, Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'


function WelcomeScreen() {
    const navigate = useNavigate()

    const handleSetupDataClick = () => {
        navigate('/setup-data')
    }

    const handleViewSlideshowsClick = () => {
        navigate('/view-slideshows')
    }

    return (
        <Container sx={styles.welcomeContainer} maxWidth="lg">
            <Box sx={styles.welcomeHeader}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={styles.welcomeHeaderText}
                >
                    Welcome to Cat Slideshow Demo
                </Typography>
                <Box
                    component="img"
                    src="https://cat-slideshow-demo.s3.us-east-1.amazonaws.com/cats_splash.png"
                    alt="Cat Slideshow Placeholder"
                    sx={styles.placeholderImage}
                />
            </Box>

            <Box sx={styles.welcomeActions}>
                <Button variant="outlined" size='large' onClick={handleSetupDataClick}>
                    Setup Data
                </Button>
                <Button variant="contained" size='large' onClick={handleViewSlideshowsClick}>
                    View Slideshows
                </Button>
            </Box>
        </Container>
    )
}

export default WelcomeScreen

let styles = {
    welcomeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: theme.spacing(4),
    },
    welcomeHeader: {
        marginBottom: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(3),
    },
    placeholderImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        // boxShadow: theme.shadows[3],
    },
    welcomeActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(3),
        width: '100%',
    },
    welcomeHeaderText: {
        fontWeight: 600,
        fontSize: '2rem',
    },
};

styles = stylesWithLabels(styles, 'WelcomeScreen');