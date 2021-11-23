import { Breadcrumbs } from 'components/Breadcrumbs'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { StateStore } from 'store'
import { authLogoutAction } from 'store/actions/authAction'
import { LogoutModal } from 'components/LogoutModal'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Modal, Typography } from '@mui/material'
import Box from '@mui/material/Box';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24',
    p: 4,
};

const AccountLayout: React.FC = ({ children }) => {
    let { login } = useSelector((store: StateStore) => store.auth)
    const [open, setOpen] = React.useState(false);
    function navbarHandle(event: any) {
        event.preventDefault()
    }
    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const logout = useCallback((ev: React.MouseEvent) => {
        ev.preventDefault()
        dispatch(authLogoutAction())
        // console.log('ajbfiuvfhiqnfwoiefjsokdjvbwirugi')
        // if(login === false) {
        //     return (
        //         <Modal
        //             open={true}
        //             onClose={handleClose}
        //             aria-labelledby="modal-modal-title"
        //             aria-describedby="modal-modal-description"
        //         >
        //             <Box style={{
        //                 position: 'absolute',
        //                 top: '50%',
        //                 left: '50%',
        //                 transform: 'translate(-50%, -50%)',
        //                 width: '400px',
        //                 // bgcolor: 'background.paper' | '',
        //                 border: '2px solid #000',
        //                 boxShadow: '24',
        //                 // p: '4',
        //             }}>
        //                 <Typography id="modal-modal-title" variant="h6" component="h2">
        //                     Đăng xuất thành công !
        //                 </Typography>
        //                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        //                     Ấn ra ngoài để tắt thông báo này
        //                 </Typography>
        //             </Box>
        //         </Modal>
        //     );
        // }
    }, [])


    
    
    return (
        <div className="account-layout">
            <section className="pt-7 pb-12">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            {/* Heading */}
                            <h3 className="mb-10">Tài khoản của tôi</h3>
                            {/* <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 50 }}>
                                
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            {/* Nav */}
                            <nav className="mb-10 mb-md-0">
                                <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to="/account/info">
                                        Thông tin cá nhân
                                    </NavLink>
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " to="/account/session"> {/*active*/}
                                        Sessions
                                    </NavLink>
                                    {/* <NavLink className="list-group-item list-group-item-action dropright-toggle " to="/account/wishlist">
                                        Wishlist
                                    </NavLink> */}

                                    {/* <NavLink className="list-group-item list-group-item-action dropright-toggle " href="account-address.html">
                                        Addresses
                                    </NavLink>
                                    <NavLink className="list-group-item list-group-item-action dropright-toggle " href="account-payment.html">
                                        Payment Methods
                                    </NavLink> */}
                                    <Link className="list-group-item list-group-item-action dropright-toggle" to="#" onClick={handleClickOpen}>
                                        Đăng xuất
                                    </Link>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        {/* <DialogTitle id="alert-dialog-title">
                                            {"Use Google's location service?"}
                                        </DialogTitle> */}
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Bạn có muốn đăng xuất ?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} >Không</Button>
                                            <Button onClick={logout} autoFocus>
                                                Có
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </nav>
                        </div>
                        <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default AccountLayout
