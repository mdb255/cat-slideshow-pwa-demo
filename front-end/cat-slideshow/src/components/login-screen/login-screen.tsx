import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Link as MuiLink,
} from '@mui/material'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { setAuthenticated } from '../../rtk/auth/auth-slice'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function LoginScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [login, { isLoading }] = catSlideshowApi.useLoginMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password')
            return
        }

        try {
            const result = await login({ email: email.trim(), password }).unwrap()
            dispatch(setAuthenticated({ accessToken: result.access_token }))
            navigate('/welcome')
        } catch (err: any) {
            console.error('Login failed:', err)
            setError(err.data?.detail || 'Login failed. Please check your credentials.')
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (error) setError('')
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (error) setError('')
    }

    return (
        <Container sx={styles.container} maxWidth="sm">
            <Box sx={styles.formContainer}>
                <Typography variant="h4" component="h1" sx={styles.title}>
                    Sign In
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        margin="normal"
                        disabled={isLoading}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        disabled={isLoading}
                    />

                    {error && (
                        <Alert severity="error" sx={styles.errorAlert}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isLoading || !email.trim() || !password.trim()}
                        sx={styles.submitButton}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </Box>

                <Box sx={styles.signupLink}>
                    <Typography variant="body2">
                        New user?{' '}
                        <MuiLink component={Link} to="/sign-up" sx={styles.link}>
                            Sign up
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

let styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2),
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
        fontWeight: 600,
    },
    form: {
        marginBottom: theme.spacing(3),
    },
    errorAlert: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    signupLink: {
        textAlign: 'center',
    },
    link: {
        fontWeight: 500,
    },
}

styles = stylesWithLabels(styles, 'LoginScreen')

export default LoginScreen
