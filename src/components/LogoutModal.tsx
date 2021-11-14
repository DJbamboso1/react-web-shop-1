import ReactDOM from 'react-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'


export const LogoutModal: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    return ReactDOM.createPortal(
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            
        </div >
        , document.body)
}



const BackDrop: React.FC<{
    onClick?: (ev: React.MouseEvent) => void
}> = ({ onClick }) => {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.modal-backdrop')?.classList.add('show')
        })
        return () => {
            document.querySelector('.modal-backdrop')?.classList.remove('show')
        }
    }, [])

    return ReactDOM.createPortal(<div onClick={onClick} className="modal-backdrop fade "></div>, document.body)
}