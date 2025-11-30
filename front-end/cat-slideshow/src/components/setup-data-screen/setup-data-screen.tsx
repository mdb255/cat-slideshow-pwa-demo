import { Container, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import TopNavBar from '../design-system/top-nav-bar'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function SetupDataScreen() {
    const navigate = useNavigate()

    return (
        <>
            <TopNavBar />
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Setup Data
                    </Typography>
                    <Box sx={styles.buttonsContainer}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/cats-admin')}
                            sx={styles.button}
                        >
                            Cats Admin
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/slideshows-admin')}
                            sx={styles.button}
                        >
                            Slideshows Admin
                        </Button>
                    </Box>
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
    buttonsContainer: {
        display: 'flex',
        gap: theme.spacing(2),
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    button: {
        minWidth: 200,
    },
}

styles = stylesWithLabels(styles, 'SetupDataScreen')

export default SetupDataScreen
