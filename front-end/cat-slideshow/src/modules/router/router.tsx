import { Routes, Route } from 'react-router-dom'
import WelcomeScreen from '../../components/welcome-screen/welcome-screen'
import SetupDataScreen from '../../components/setup-data-screen/setup-data-screen'
import ViewSlideshowsScreen from '../../components/view-slideshows-screen/view-slideshows-screen'
import PlaySlideshowScreen from '../../components/play-slideshow-screen/play-slideshow-screen'
import CatsAdminScreen from '../../components/cats-admin-screen/cats-admin-screen'
import SlideshowsAdminScreen from '../../components/slideshows-admin-screen/slideshows-admin-screen'

function Router() {
    return (
        <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/setup-data" element={<SetupDataScreen />} />
            <Route path="/view-slideshows" element={<ViewSlideshowsScreen />} />
            <Route path="/play-slideshow/:id" element={<PlaySlideshowScreen />} />
            <Route path="/cats-admin" element={<CatsAdminScreen />} />
            <Route path="/slideshows-admin" element={<SlideshowsAdminScreen />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    )
}

export default Router
