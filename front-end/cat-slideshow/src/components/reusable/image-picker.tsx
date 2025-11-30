import { useState } from 'react'
import {
    Box,
    IconButton,
    Typography,
    Dialog,
    AppBar,
    Toolbar,
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Checkbox,
} from '@mui/material'
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material'
import { stylesWithLabels } from '../../modules/util/styles-util'
import theme from '../../modules/theme/theme'

interface ImagePickerProps {
    availableImageUrls: string[]
    selectedImageUrls: string[]
    onChange: (urls: string[]) => void
    maxSelection?: number
}

function ImagePicker({
    availableImageUrls,
    selectedImageUrls,
    onChange,
    maxSelection,
}: ImagePickerProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [tempSelection, setTempSelection] = useState<string[]>([])

    const handleOpen = () => {
        setTempSelection([...selectedImageUrls])
        setDialogOpen(true)
    }

    const handleUse = () => {
        onChange(tempSelection)
        setDialogOpen(false)
    }

    const handleCancel = () => {
        setTempSelection([])
        setDialogOpen(false)
    }

    const handleToggleImage = (url: string) => {
        setTempSelection(prev => {
            const isSelected = prev.includes(url)
            if (isSelected) {
                return prev.filter(u => u !== url)
            } else {
                if (maxSelection && prev.length >= maxSelection) {
                    return prev
                }
                return [...prev, url]
            }
        })
    }

    return (
        <>
            <Box sx={styles.collapsedContainer}>
                <Typography variant="body1" sx={styles.selectionText}>
                    {selectedImageUrls.length} {selectedImageUrls.length === 1 ? 'image' : 'images'} selected
                </Typography>
                <IconButton
                    onClick={handleOpen}
                    aria-label="open image picker"
                    size="small"
                >
                    <MoreHorizIcon />
                </IconButton>
            </Box>

            <Dialog
                fullScreen
                open={dialogOpen}
                onClose={handleCancel}
            >
                <Box sx={styles.dialogContent}>
                    {availableImageUrls.length === 0 ? (
                        <Box sx={styles.emptyState}>
                            <Typography variant="body1" color="text.secondary">
                                No images available
                            </Typography>
                        </Box>
                    ) : (
                        <ImageList cols={2} gap={16} sx={styles.imageList}>
                            {availableImageUrls.map(url => {
                                const isSelected = tempSelection.includes(url)
                                const isDisabled = !!maxSelection && tempSelection.length >= maxSelection && !isSelected

                                return (
                                    <ImageListItem key={url} sx={styles.imageListItem}>
                                        <img
                                            src={url}
                                            alt="Cat"
                                            loading="lazy"
                                            style={{ cursor: 'pointer', height: '100%', objectFit: 'cover' }}
                                            onClick={() => !isDisabled && handleToggleImage(url)}
                                            onError={(e: any) => {
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EError%3C/text%3E%3C/svg%3E'
                                            }}
                                        />
                                        <ImageListItemBar
                                            sx={styles.imageListItemBar}
                                            position="top"
                                            actionIcon={
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleToggleImage(url)}
                                                    disabled={isDisabled}
                                                    sx={styles.checkbox}
                                                />
                                            }
                                            actionPosition="right"
                                        />
                                    </ImageListItem>
                                )
                            })}
                        </ImageList>
                    )}
                </Box>

                <AppBar position="fixed" color="default" sx={styles.bottomBar}>
                    <Toolbar sx={styles.toolbar}>
                        <Typography variant="body1" sx={styles.selectedText}>
                            Selected ({tempSelection.length})
                        </Typography>
                        <Box sx={styles.actionButtons}>
                            <Button onClick={handleCancel} color="inherit">
                                Cancel
                            </Button>
                            <Button onClick={handleUse} variant="contained" color="primary">
                                Use
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </>
    )
}

let styles = {
    collapsedContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    selectionText: {
        flexGrow: 1,
    },
    dialogContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        paddingBottom: theme.spacing(8), // Space for bottom bar
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    imageList: {
        padding: theme.spacing(2),
    },
    imageListItem: {
        cursor: 'pointer',
        position: 'relative' as const,
    },
    imageListItemBar: {
        background: 'transparent',
    },
    checkbox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
    },
    bottomBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedText: {
        fontWeight: 'bold' as const,
    },
    actionButtons: {
        display: 'flex',
        gap: theme.spacing(2),
    },
}

styles = stylesWithLabels(styles, 'ImagePicker')

export default ImagePicker

