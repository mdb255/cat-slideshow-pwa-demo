import { Box, Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function SignUpScreen() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/login')
    }

    return (
        <Container sx={styles.container} maxWidth="lg">
            <Box sx={styles.content}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={styles.title}
                >
                    Sign Up
                </Typography>

                <Box sx={styles.messageContainer}>
                    <Typography
                        variant="h5"
                        component="p"
                        sx={styles.message}
                    >
                        Coming Soon
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={styles.description}
                    >
                        User registration will be available soon. Please check back later.
                    </Typography>
                </Box>

                <Box sx={styles.actions}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={handleBackClick}
                        sx={styles.backButton}
                    >
                        Back to Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

let styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: theme.spacing(4),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(4),
        maxWidth: 600,
    },
    title: {
        fontWeight: 600,
        fontSize: '2rem',
        marginBottom: theme.spacing(2),
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    message: {
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
    description: {
        color: theme.palette.text.secondary,
        maxWidth: 400,
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
    },
    backButton: {
        minWidth: 200,
    },
}

styles = stylesWithLabels(styles, 'SignUpScreen')

export default SignUpScreen
