import { useEffect } from 'react'
import { IonApp } from '@ionic/react'
import Router from './modules/router/router.tsx'
import PWABadge from './PWABadge.tsx'
import AuthInitializer from './components/auth-initializer/auth-initializer'

function App() {
    useEffect(() => {
        // Force input fields to use Android (Material Design) mode
        const setInputMode = () => {
            const inputSelectors = [
                'ion-input',
                'ion-textarea',
                'ion-select',
                'ion-checkbox',
                'ion-radio',
                'ion-toggle',
            ]

            inputSelectors.forEach((selector) => {
                document.querySelectorAll(selector).forEach((element) => {
                    if (element.getAttribute('mode') !== 'md') {
                        element.setAttribute('mode', 'md')
                    }
                })
            })
        }

        // Set mode on existing elements
        setInputMode()

        // Watch for dynamically added input elements
        const observer = new MutationObserver(setInputMode)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        return () => observer.disconnect()
    }, [])

    return (
        <IonApp>
            <AuthInitializer>
                <Router />
            </AuthInitializer>
            <PWABadge />
        </IonApp>
    )
}

export default App
