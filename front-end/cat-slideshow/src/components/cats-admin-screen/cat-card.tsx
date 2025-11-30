import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Cat } from '../../rtk/cats/cat-model'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface CatCardProps {
    cat: Cat
    onEdit: () => void
    onDelete: () => void
}

function CatCard({ cat, onEdit, onDelete }: CatCardProps) {
    return (
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
                <Box sx={styles.infoContainer}>
                    <Typography variant="h6" component="div">
                        {cat.name}
                    </Typography>
                    {cat.breed && (
                        <Typography variant="body2" color="text.secondary">
                            {cat.breed}
                        </Typography>
                    )}
                </Box>
                <Box sx={styles.actionsContainer}>
                    <IconButton
                        aria-label="edit cat"
                        onClick={onEdit}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete cat"
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

styles = stylesWithLabels(styles, 'CatCard')

export default CatCard

