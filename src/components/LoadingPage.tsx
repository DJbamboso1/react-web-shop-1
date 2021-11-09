import { CircularProgress } from '@mui/material'

export default function LoadingPage() {
    return (
        <div style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 100}}>
            <CircularProgress />
        </div>
    )
}