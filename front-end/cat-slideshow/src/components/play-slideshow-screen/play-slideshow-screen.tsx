import { useState, useEffect } from 'react'
import { IonPage, IonContent, IonSpinner, IonText } from '@ionic/react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import TopNavBar from '../design-system/top-nav-bar'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'

const FALLBACK_IMAGE_SRC =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23ddd" width="800" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EImage Failed to Load%3C/text%3E%3C/svg%3E'

function PlaySlideshowScreen() {
    const { id } = useParams<{ id: string }>()
    const slideshowId = id ? parseInt(id, 10) : undefined

    const { data: slideshow, isLoading, error } = catSlideshowApi.useGetSlideshowQuery(slideshowId!, {
        skip: !slideshowId,
    })

    const [maxImageHeight, setMaxImageHeight] = useState(300)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    useEffect(() => {
        if (slideshow && slideshow.image_urls.length > 0) {
            const loadImage = (url: string) => {
                return new Promise<number>((resolve) => {
                    const img = new Image()
                    img.onload = () => {
                        const maxWidth = window.innerWidth * 0.9
                        const aspectRatio = img.height / img.width
                        const constrainedHeight = Math.min(img.height, maxWidth * aspectRatio)
                        resolve(Math.min(constrainedHeight, window.innerHeight * 0.7))
                    }
                    img.onerror = () => resolve(300)
                    img.src = url
                })
            }

            Promise.all(slideshow.image_urls.map(loadImage)).then((heights) => {
                setMaxImageHeight(Math.max(...heights, 300))
                setImagesLoaded(true)
            })
        }
    }, [slideshow])

    return (
        <IonPage>
            <TopNavBar />
            <IonContent className="ion-padding">
                <div className="mt-6 max-w-4xl mx-auto">
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <IonSpinner name="crescent" />
                        </div>
                    )}

                    {error && (
                        <IonText color="danger" className="block mt-4">
                            <p>Failed to load slideshow. Please try again.</p>
                        </IonText>
                    )}

                    {!isLoading && !error && !slideshow && (
                        <IonText color="warning" className="block mt-4">
                            <p>Slideshow not found.</p>
                        </IonText>
                    )}

                    {!isLoading && !error && slideshow && (
                        <>
                            <h1 className="text-3xl font-semibold text-center text-black mb-2">
                                {slideshow.title}
                            </h1>
                            {slideshow.description && (
                                <p className="text-center mb-6" style={{ color: 'var(--app-subtitle-color)' }}>
                                    {slideshow.description}
                                </p>
                            )}

                            {slideshow.image_urls.length === 0 ? (
                                <IonText color="medium" className="block mt-4">
                                    <p>This slideshow has no images yet.</p>
                                </IonText>
                            ) : (
                                <div className="mt-6">
                                    {!imagesLoaded && (
                                        <div className="flex justify-center py-8">
                                            <IonSpinner name="crescent" />
                                        </div>
                                    )}
                                    <Swiper
                                        modules={[Pagination]}
                                        pagination={{ clickable: true }}
                                        spaceBetween={16}
                                        slidesPerView={1}
                                        className={imagesLoaded ? 'play-slideshow-swiper' : 'play-slideshow-swiper invisible h-0'}
                                        style={imagesLoaded && maxImageHeight > 0 ? { minHeight: maxImageHeight } : undefined}
                                    >
                                        {slideshow.image_urls.map((url, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className="flex justify-center items-center w-full"
                                                    style={imagesLoaded && maxImageHeight > 0 ? { minHeight: maxImageHeight } : undefined}
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`${slideshow.title} - Image ${index + 1}`}
                                                        className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg mx-auto block"
                                                        style={imagesLoaded && maxImageHeight > 0 ? { maxHeight: maxImageHeight } : undefined}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_SRC
                                                        }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default PlaySlideshowScreen
