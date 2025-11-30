import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#6d0fab',
            light: '#9c4dd4',
            dark: '#4a0777',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#b771e2',
            light: '#d4a3f0',
            dark: '#8a4bb8',
            contrastText: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 12,
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
    },
})

export default theme
