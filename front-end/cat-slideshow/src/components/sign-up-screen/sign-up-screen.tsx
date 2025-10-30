import { useState } from 'react'
import { Box, Typography, Container, Button, TextField, Alert, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import TopNavBar from '../design-system/top-nav-bar'

function SignUpScreen() {
    const navigate = useNavigate()

    const [step, setStep] = useState<1 | 2>(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmationCode, setConfirmationCode] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [showConfirmPw, setShowConfirmPw] = useState(false)
    const [error, setError] = useState('')

    const [signup, { isLoading: isSigningUp }] = catSlideshowApi.useSignupMutation()
    const [confirmSignup, { isLoading: isConfirming }] = catSlideshowApi.useConfirmSignupMutation()

    const isValidEmail = (val: string) => /.+@.+\..+/.test(val)

    const handleSubmitStep1 = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!isValidEmail(email)) {
            setError('Enter a valid email')
            return
        }
        if (!password || !confirmPassword) {
            setError('Enter password in both fields')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        try {
            await signup({ email: email.trim(), password }).unwrap()
            setStep(2)
        } catch (err: any) {
            setError(err?.data?.detail || 'Sign up failed')
        }
    }

    const handleSubmitStep2 = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!confirmationCode.trim()) {
            setError('Enter the confirmation code')
            return
        }
        try {
            await confirmSignup({ email: email.trim(), confirmation_code: confirmationCode.trim() }).unwrap()
            navigate('/login')
        } catch (err: any) {
            setError(err?.data?.detail || 'Confirmation failed')
        }
    }

    const passwordsMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
    const isStep1Valid = () => isValidEmail(email) && password.length > 0 && confirmPassword.length > 0 && !passwordsMismatch

    return (
        <>
            <TopNavBar />
            <Container sx={styles.container} maxWidth="sm">
                <Box sx={styles.content}>
                    <Typography variant="h4" component="h1" sx={styles.title}>
                        {step === 1 ? 'Create your account' : 'Confirm your email'}
                    </Typography>

                    {step === 1 ? (
                        <Box component="form" onSubmit={handleSubmitStep1} sx={styles.form}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                disabled={isSigningUp}
                            />
                            <TextField
                                label="Password"
                                type={showPw ? 'text' : 'password'}
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                disabled={isSigningUp}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPw((s) => !s)} edge="end" aria-label="toggle password visibility">
                                                    {showPw ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                type={showConfirmPw ? 'text' : 'password'}
                                fullWidth
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                margin="normal"
                                disabled={isSigningUp}
                                error={passwordsMismatch}
                                helperText={passwordsMismatch ? "Passwords don't match" : undefined}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPw((s) => !s)} edge="end" aria-label="toggle confirm password visibility">
                                                    {showConfirmPw ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            {error && <Alert severity="error" sx={styles.error}>{error}</Alert>}

                            <Box sx={styles.actions}>
                                <Button type="submit" variant="contained" size="large" disabled={isSigningUp || !isStep1Valid()}>
                                    {isSigningUp ? 'Creating account…' : 'Sign Up'}
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmitStep2} sx={styles.form}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Confirmation Code"
                                fullWidth
                                required
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                margin="normal"
                                disabled={isConfirming}
                            />

                            {error && <Alert severity="error" sx={styles.error}>{error}</Alert>}

                            <Box sx={styles.actions}>
                                <Button type="submit" variant="contained" size="large" disabled={isConfirming || !confirmationCode.trim()}>
                                    {isConfirming ? 'Confirming…' : 'Confirm'}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    )
}

let styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: theme.spacing(4),
    },
    content: {
        width: '100%',
        maxWidth: 440,
    },
    title: {
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(2),
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    error: {
        mt: 1,
    },
}

styles = stylesWithLabels(styles, 'SignUpScreen')

export default SignUpScreen
