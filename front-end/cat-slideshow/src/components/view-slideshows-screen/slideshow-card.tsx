import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import type { Slideshow } from '../../rtk/slideshows/slideshow-model'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface SlideshowCardProps {
    slideshow: Slideshow
    onClick: () => void
}

function SlideshowCard({ slideshow, onClick }: SlideshowCardProps) {
    return (
        <Card sx={styles.card} onClick={onClick}>
            <CardContent sx={styles.cardContent}>
                <Box sx={styles.infoContainer}>
                    <Typography variant="h6" component="div">
                        {slideshow.title}
                    </Typography>
                    {slideshow.description && (
                        <Typography variant="body2" color="text.secondary">
                            {slideshow.description}
                        </Typography>
                    )}
                </Box>
                <IconButton
                    aria-label="view slideshow"
                    edge="end"
                >
                    <ChevronRightIcon />
                </IconButton>
            </CardContent>
        </Card>
    )
}

let styles = {
    card: {
        width: '100%',
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:last-child': {
            paddingBottom: theme.spacing(2),
        },
    },
    infoContainer: {
        flex: 1,
    },
}

styles = stylesWithLabels(styles, 'SlideshowCard')

export default SlideshowCard

