import Router from './modules/router/router.tsx'
import PWABadge from './PWABadge.tsx'
import AuthInitializer from './components/auth-initializer/auth-initializer'

function App() {
    return (
        <>
            <AuthInitializer>
                <Router />
            </AuthInitializer>
            <PWABadge />
        </>
    )
}

export default App
