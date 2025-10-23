import { useState, useEffect } from 'react'
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TopNavBar from '../design-system/top-nav-bar'
import { catSlideshowApi } from '../../rtk/cat-slideshow-api'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

function PlaySlideshowScreen() {
    const { id } = useParams<{ id: string }>()
    const slideshowId = id ? parseInt(id, 10) : undefined

    // Fetch slideshow data
    const { data: slideshow, isLoading, error } = catSlideshowApi.useGetSlideshowQuery(slideshowId!, {
        skip: !slideshowId,
    })

    // Track max height of images
    const [maxImageHeight, setMaxImageHeight] = useState<number>(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    // Preload images and calculate max height
    useEffect(() => {
        if (slideshow && slideshow.image_urls.length > 0) {
            const loadImage = (url: string) => {
                return new Promise<number>((resolve) => {
                    const img = new Image()
                    img.onload = () => {
                        // Calculate height at max width constraint
                        const maxWidth = window.innerWidth * 0.9 // 90% of window width
                        const aspectRatio = img.height / img.width
                        const constrainedHeight = Math.min(img.height, maxWidth * aspectRatio)
                        resolve(Math.min(constrainedHeight, window.innerHeight * 0.7)) // Max 70vh
                    }
                    img.onerror = () => resolve(300) // Default height for failed images
                    img.src = url
                })
            }

            Promise.all(slideshow.image_urls.map(loadImage)).then((heights) => {
                const maxH = Math.max(...heights, 300) // Minimum 300px
                setMaxImageHeight(maxH)
                setImagesLoaded(true)
            })
        }
    }, [slideshow])

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        arrows: false,
        adaptiveHeight: false,
        dotsClass: 'slick-dots slick-dots-bottom',
    }

    return (
        <>
            <TopNavBar />
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.contentBox}>
                    {isLoading && (
                        <Box sx={styles.loadingContainer}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={styles.alert}>
                            Failed to load slideshow. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && !slideshow && (
                        <Alert severity="warning" sx={styles.alert}>
                            Slideshow not found.
                        </Alert>
                    )}

                    {!isLoading && !error && slideshow && (
                        <>
                            <Typography variant="h2" component="h1" gutterBottom sx={styles.title}>
                                {slideshow.title}
                            </Typography>

                            {slideshow.description && (
                                <Typography variant="body1" color="text.secondary" gutterBottom sx={styles.description}>
                                    {slideshow.description}
                                </Typography>
                            )}

                            {slideshow.image_urls.length === 0 ? (
                                <Alert severity="info" sx={styles.alert}>
                                    This slideshow has no images yet.
                                </Alert>
                            ) : (
                                <Box
                                    sx={{
                                        ...styles.sliderContainer,
                                        ...(imagesLoaded && maxImageHeight > 0 && {
                                            '& .slick-list, & .slick-track': {
                                                height: `${maxImageHeight}px`,
                                            },
                                        }),
                                    }}
                                >
                                    {!imagesLoaded && (
                                        <Box sx={styles.loadingContainer}>
                                            <CircularProgress size={30} />
                                        </Box>
                                    )}
                                    <Slider {...sliderSettings}>
                                        {slideshow.image_urls.map((url, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    ...styles.slideBox,
                                                    ...(imagesLoaded && maxImageHeight > 0 && {
                                                        height: `${maxImageHeight}px`,
                                                    }),
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={url}
                                                    alt={`${slideshow.title} - Image ${index + 1}`}
                                                    sx={styles.slideImage}
                                                    onError={(e: any) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23ddd" width="800" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EImage Failed to Load%3C/text%3E%3C/svg%3E'
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </>
    )
}

let styles = {
    container: {
        padding: theme.spacing(4),
    },
    contentBox: {
        marginTop: theme.spacing(4),
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(4),
    },
    alert: {
        marginTop: theme.spacing(2),
    },
    title: {
        textAlign: 'center' as const,
    },
    description: {
        textAlign: 'center' as const,
        marginBottom: theme.spacing(4),
    },
    sliderContainer: {
        marginTop: theme.spacing(4),
        '& .slick-list': {
            marginLeft: theme.spacing(-4),
            marginRight: theme.spacing(-4),
        },
        '& .slick-slide > div': {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
        '& .slick-dots': {
            position: 'relative' as const,
            bottom: 'auto',
            marginTop: theme.spacing(3),
        },
        '& .slick-dots li button:before': {
            fontSize: 12,
        },
    },
    slideBox: {
        display: 'flex !important' as any,
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',
    },
    slideImage: {
        maxWidth: '100%',
        maxHeight: '70vh',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain' as const,
        borderRadius: theme.shape.borderRadius,
        margin: '0 auto',
        display: 'block',
    },
}

styles = stylesWithLabels(styles, 'PlaySlideshowScreen')

export default PlaySlideshowScreen

