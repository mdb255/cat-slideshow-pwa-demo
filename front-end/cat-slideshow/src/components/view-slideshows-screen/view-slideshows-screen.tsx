import { IonPage, IonContent, IonSpinner, IonText } from '@ionic/react'
import { useNavigate } from 'react-router-dom'
import TopNavBar from '../design-system/top-nav-bar'
import SlideshowCard from './slideshow-card'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

function ViewSlideshowsScreen() {
    const navigate = useNavigate()

    const { data: slideshows, isLoading, error } = catSlideshowApi.useGetSlideshowsQuery({})

    const handleSlideshowClick = (slideshowId: number) => {
        navigate(`/play-slideshow/${slideshowId}`)
    }

    return (
        <IonPage>
            <TopNavBar />
            <IonContent className="ion-padding">
                <div className="mt-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-4">View Slideshows</h1>

                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <IonSpinner name="crescent" />
                        </div>
                    )}

                    {error && (
                        <IonText color="danger" className="block mt-4">
                            <p>Failed to load slideshows. Please try again.</p>
                        </IonText>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length === 0 && (
                        <div className="text-center py-8 text-secondary">
                            <p>No slideshows available. Create some in the admin section!</p>
                        </div>
                    )}

                    {!isLoading && !error && slideshows && slideshows.length > 0 && (
                        <div className="mt-6 space-y-0">
                            {slideshows.map((slideshow) => (
                                <SlideshowCard
                                    key={slideshow.id}
                                    slideshow={slideshow}
                                    onClick={() => handleSlideshowClick(slideshow.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ViewSlideshowsScreen
