import { CircularProgress } from '@mui/material'

export default function LoadingButton() {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
        </div>
    )
}