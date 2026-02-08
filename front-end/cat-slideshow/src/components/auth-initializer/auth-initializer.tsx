import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IonSpinner } from '@ionic/react'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { setAuthenticated, setInitialized, clearAuth } from '../../rtk/auth/auth-slice'
import { RootState } from '../../rtk/store'
import { ReactNode, useRef } from 'react'

interface AuthInitializerProps {
    children: ReactNode
}

function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useDispatch()
    const { isInitialized } = useSelector((state: RootState) => state.auth)

    const [resume] = catSlideshowApi.useResumeMutation()
    const hasInitializedRef = useRef(false)

    useEffect(() => {
        if (hasInitializedRef.current) {
            return
        }
        hasInitializedRef.current = true

        const initializeAuth = async () => {
            try {
                const result = await resume().unwrap()
                dispatch(setAuthenticated({ accessToken: result.access_token }))
            } catch {
                dispatch(clearAuth())
            } finally {
                dispatch(setInitialized())
            }
        }

        initializeAuth()
    }, [dispatch, resume])

    if (!isInitialized) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <IonSpinner name="crescent" />
            </div>
        )
    }

    return <>{children}</>
}

export default AuthInitializer
