import { CircularProgress } from '@mui/material'

export default function LoadingPage() {
    return (
        <div style={{height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
        </div>
    )
}