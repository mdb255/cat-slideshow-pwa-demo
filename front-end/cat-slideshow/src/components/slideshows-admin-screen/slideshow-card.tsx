import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Slideshow } from '../../rtk/slideshows/slideshow-model'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface SlideshowCardProps {
    slideshow: Slideshow
    onEdit: () => void
    onDelete: () => void
}

function SlideshowCard({ slideshow, onEdit, onDelete }: SlideshowCardProps) {
    return (
        <Card sx={styles.card}>
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
                <Box sx={styles.actionsContainer}>
                    <IconButton
                        aria-label="edit slideshow"
                        onClick={onEdit}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete slideshow"
                        onClick={onDelete}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    )
}

let styles = {
    card: {
        width: '100%',
        marginBottom: theme.spacing(2),
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
    actionsContainer: {
        display: 'flex',
        gap: theme.spacing(1),
    },
}

styles = stylesWithLabels(styles, 'SlideshowCard')

export default SlideshowCard

