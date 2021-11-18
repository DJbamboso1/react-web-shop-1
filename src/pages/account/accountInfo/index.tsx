import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateStore } from 'store'
import { useForm } from 'core'
import ErrorInput from 'components/ErrorInput'
import { User } from '@types'
import authService from 'services/authService'
import { data } from 'flickity'
import LoadingAvatar from 'components/LoadingAvatar'
import { Modal, Skeleton, Typography, Box } from '@mui/material'
import { ref, getDownloadURL, storage, uploadBytesResumable, uploadString } from 'utils/firebase'
import { authLogin, updateInfo } from 'store/actions/authAction'
import { Breadcrumbs } from 'components/Breadcrumbs'
import LoadingPage from 'components/LoadingPage'
// import Box from '@mui/material/Box';

type Form = User['data']

const TYPE_MALE = 1
const TYPE_FEMALE = 2

export const style = {

};

const AccountInfo: React.FC = () => {

    let dispatch = useDispatch()
    let [countDay, setCountDay] = useState<number>(0)
    let { register, setForm, handleSubmit, error, form } = useForm<Form>()

    let [open, setOpen] = useState(false);

    let [loading, setLoading] = useState(false)

    let avatarRef = useRef<HTMLInputElement>(null)

    let yearNow = new Date().getFullYear()

    let [message, setMessage] = useState('')

    let { user } = useSelector((store: StateStore) => store.auth)
    useEffect(() => {
        (async () => {
            if (user) {
                let inf = await authService.getInfo(user.id)
                let date = new Date(inf.data.doB)
                console.log('aaaaaaaaaaaaaaaanvjfvjdfv: ', date)
                inf.data.day = date.getDate()
                inf.data.month = date.getMonth() + 1
                console.log('month: ', inf.data.month)
                inf.data.year = date.getFullYear()

                setForm(inf.data)
                // setForm(...inf.data, sex: 0)
                // changeDate()
                let date1 = new Date(form.year, form.month, 0)
                setCountDay(date1.getDate())
                // setLoading(false)
                console.log(inf.data)
            }
        })()
    }, [])

    useEffect(() => {
        let month = form.month
        let year = form.year
        let date = new Date(year, month, 0)
        setCountDay(date.getDate())
        if (form.day > countDay) {
            form.day = 1
        }
        console.log(month)
        console.log(year)
        console.log(countDay)
    }, [form.month, form.year])


    const submit = async (form: Form) => {
        setLoading(true)
        form.doB = `${form.year}/${form.month > 9 ? '' : '0'}${form.month}/${form.day > 9 ? '' : '0'}${form.day}`
        console.log(form.doB)
        let profile = await authService.updateProfile(form)
        setLoading(false)
        if (profile.succeeded) {
            dispatch(updateInfo(form))
            setMessage('Cập nhật thành công')
        } else {
            setMessage('Cập nhật không thành công')
        }
        setOpen(true)

    }
    // if (state) {
    //     return <LoadingPage />
    // }

    const changeAvatar = (ev: React.ChangeEvent<HTMLInputElement>) => {

        setLoading(true)
        let avatar = ev.currentTarget.files?.[0]
        console.log('AVATARRRRRRRRRR:', avatar?.name)
        if (avatar) {
            const storageRef = ref(storage, 'avatar/');
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        setForm({ ...form, avatar: downloadURL })
                        setLoading(false)
                        let user = await authService.getInfo(form.id)
                        console.log("HELLO WORLD: ", user)
                        if (user.data.avatar) {
                            setOpen(true)
                        }

                        // console.log('Download', downloadURL)
                    })
                }
            )
        }
        // console.log('ushvoiwjvuerihvoikqenvgiuwrhfoiendgiuwrhfoivneuigh8wef')

    }

    if (open === true) {
        return (
            <Modal
                open={open}
                onClose={() => { setOpen(false); setMessage('') }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {message.length > 0 ? message : 'Cập nhật ảnh đại diện thành công'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Ấn bên ngoài cửa số thông báo để tắt
                    </Typography>
                </Box>
            </Modal>
        )
    }


    return (
        <>
            <Breadcrumbs list={[
                {
                    title: 'Home',
                    link: '/'
                },
                {
                    title: 'Account',
                    link: '/account/info'
                },

            ]} />
            <form onSubmit={handleSubmit(submit)}>
                <div className="row">
                    <div className="col-12">
                        {/* Email */}
                        <div className="form-group" style={{ textAlign: 'center' }}>
                            {/* <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />  */}
                            {!loading ? <img className='avatar' src={form.avatar || '/img/avatar.jpg'} alt="" onClick={() => { avatarRef.current?.dispatchEvent(new MouseEvent('click')) }} /> : <LoadingAvatar />}
                            <input type="file" style={{ display: 'none' }} ref={avatarRef} accept="image/*" onChange={changeAvatar} />
                        </div>
                    </div>
                    {!loading ? (<>
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                {form.displayName ? <label htmlFor="accountFirstName">
                                    Full Name *
                                </label> : <Skeleton width='30%' height={35} />}
                                {form.displayName ? <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} /> : <Skeleton width='100%' height={75} />}
                            </div>
                        </div>
                        <ErrorInput error={error.displayName} />
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                {form.email ? <label htmlFor="accountEmail">
                                    Email Address *
                                </label> : <Skeleton width='30%' height={35} />}
                                {form.email ? <input className="form-control form-control-sm" id="accountEmail" type="email" placeholder="Email Address *"   {...register('email', { pattern: 'email' })} /> : <Skeleton width='100%' height={75} />}
                            </div>
                        </div>
                        {/* <div className="col-12 col-md-6">
                        
                        <div className="form-group">
                            {
                                form.id ? <label htmlFor="accountPassword">
                                    Current Password *
                                </label> : <Skeleton width='30%' height={35} />
                            }
                            {
                                form.id ? <input className="form-control form-control-sm" id="accountPassword" type="password" placeholder="Current Password *" /> : <Skeleton width='100%' height={75} />
                            }

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        
                        <div className="form-group">
                            {
                                form.id ? <label htmlFor="AccountNewPassword">
                                    New Password *
                                </label> : <Skeleton width='30%' height={35} />
                            }
                            {
                                form.id ? <input className="form-control form-control-sm" id="AccountNewPassword" type="password" placeholder="New Password *" /> : <Skeleton width='100%' height={75} />
                            }
                        </div>
                    </div> */}
                        <div className="col-12 col-lg-7">
                            {/* Birthday */}
                            <div className="form-group">
                                {/* Label */}
                                {form.doB ? <label>Date of Birth</label> : <Skeleton width="60%" height={24} />}
                                {/* Inputs */}
                                {form.doB ? (<div className="form-row">
                                    <div className="col-auto">
                                        {/* Date */}
                                        <label className='sr-only' htmlFor="accountDate">
                                            Day
                                        </label>
                                        {
                                            countDay && <select className="custom-select custom-select-sm" id="accountDate" {...register('day')}  >
                                                {
                                                    [...Array(countDay)].map((e, i) => <option value={i + 1}>{i + 1}</option>)
                                                }
                                            </select>
                                        }
                                    </div>
                                    <div className="col">
                                        {/* Date */}
                                        <label className='sr-only' htmlFor="accountMonth">
                                            Month
                                        </label>
                                        <select className="custom-select custom-select-sm" id="accountMonth"  {...register('month')}  >
                                            {
                                                [...Array(12)].map((e, i) => <option value={i + 1}>{i + 1}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        {/* Date */}
                                        <label className='sr-only' htmlFor="accountYear">
                                            Year
                                        </label>
                                        <select className="custom-select custom-select-sm" id="accountYear"  {...register('year')} >
                                            {
                                                [...Array(50)].map((e, i) => <option value={yearNow - i}>{yearNow - i}</option>)
                                            }
                                            {/* <option>1990</option>
                                    <option selected>1991</option>
                                    <option>1992</option> */}
                                        </select>
                                    </div>
                                </div>) : <Skeleton className='form-row' height={51} />}
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            {/* Gender */}
                            <div className="form-group mb-8">
                                {form.sex ? <label>Gender</label> : <Skeleton width="60%" height={24} />}
                                {form.sex ? (<div className="btn-group-toggle" data-toggle="buttons">
                                    <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_MALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_MALE })}>
                                        <input type="radio" name="gender" /> Male
                                    </label>
                                    <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_FEMALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_FEMALE })}>
                                        <input type="radio" name="gender" /> Female
                                    </label>
                                </div>) : <Skeleton className='btn-group-toggle' height={51} />}
                            </div>
                        </div>
                        <div className="col-12">
                            {/* Button */}
                            <button className="btn btn-dark" type="submit" disabled={form.id ? false : true}>Save Changes</button>
                        </div>
                    </>) :
                        <div className='col-12' style={{ textAlign: 'center' }}>
                            <LoadingAvatar />
                        </div>}


                </div>
            </form>
        </>
    )
}

export default AccountInfo
