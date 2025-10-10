import { Box, Typography, Container, Button } from '@mui/material'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'


function WelcomeScreen() {
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
            </Box>

            <Box sx={styles.welcomeActions}>
                <Button variant="outlined" size='large'>
                    Setup Data
                </Button>
                <Button variant="contained" size='large'>
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