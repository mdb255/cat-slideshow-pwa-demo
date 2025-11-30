import { AppBar, Toolbar, Box } from '@mui/material'
import { ReactNode } from 'react'
import BackButton from './back-button'
import { stylesWithLabels } from '../../modules/util/styles-util'

interface TopNavBarProps {
    children?: ReactNode
    showBackButton?: boolean
}

function TopNavBar({ children, showBackButton = true }: TopNavBarProps) {
    return (
        <AppBar position="fixed" elevation={1}>
            <Toolbar>
                {showBackButton && <BackButton />}
                <Box sx={styles.spacer} />
                {children && (
                    <Box sx={styles.actionsContainer}>
                        {children}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

let styles = {
    spacer: {
        flexGrow: 1,
    },
    actionsContainer: {
        display: 'flex',
        gap: 1,
        alignItems: 'center',
    },
}

styles = stylesWithLabels(styles, 'TopNavBar')

export default TopNavBar
