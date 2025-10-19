import { IconButton, Tooltip } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { stylesWithLabels } from '../../modules/util/styles-util'

interface BackButtonProps {
    tooltip?: string
    onClick?: () => void
}

function BackButton({ tooltip = 'Go back', onClick }: BackButtonProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            navigate(-1)
        }
    }

    return (
        <Tooltip title={tooltip}>
            <IconButton onClick={handleClick} sx={styles.button}>
                <ArrowBack />
            </IconButton>
        </Tooltip>
    )
}

let styles = {
    button: {
        color: 'white',
    },
}

styles = stylesWithLabels(styles, 'BackButton')

export default BackButton
