import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IonReactRouter } from '@ionic/react-router'
import { Provider } from 'react-redux'
import { setupIonicReact } from '@ionic/react'
import App from './app'
import { store } from './rtk/store'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import './modules/theme/ionic-theme.css'
import './index.css'

setupIonicReact({
    mode: 'ios',
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <IonReactRouter>
                <App />
            </IonReactRouter>
        </Provider>
    </StrictMode>,
)
