import { Box, Typography, Container, Button, IconButton, Menu, MenuItem, Tooltip, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'
import TopNavBar from '../design-system/top-nav-bar'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../rtk/auth/auth-slice'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'


function WelcomeScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const menuOpen = Boolean(anchorEl)

    const [logoutTrigger] = catSlideshowApi.useLogoutMutation()

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleSetupDataClick = () => {
        navigate('/setup-data')
    }

    const handleViewSlideshowsClick = () => {
        navigate('/view-slideshows')
    }

    const handleLogout = async () => {
        try {
            await logoutTrigger().unwrap()
        } catch (e) {
            // proceed to clear auth regardless; backend may already have invalidated session
        } finally {
            dispatch(clearAuth())
            navigate('/login')
        }
    }

    return (
        <>
            <TopNavBar showBackButton={false}>
                <Tooltip title="Profile">
                    <IconButton
                        onClick={handleOpenMenu}
                        aria-controls={menuOpen ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        size="large"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
            </TopNavBar>
            <Toolbar />
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
        </>
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