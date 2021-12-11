import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateStore } from 'store'
import { useForm, useTranslate } from 'core'
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
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    let {t} = useTranslate()
    let dispatch = useDispatch()
    let [countDay, setCountDay] = useState<number>(0)
    let { register, setForm, handleSubmit, error, form } = useForm<Form>({}, {
        preCheck: (initRule: any) => {
            // console.log(form)
            if (!form.oldPassword && !form.newPassword) {
                // console.log('DELETE')
                delete initRule.oldPassword
                delete initRule.newPassword
            }
            if (!form.businessLicense) delete initRule.businessLicense
            if (!form.taxId) delete initRule.taxId
            // console.log('NOT DELETE')
        }
    })

    let [open, setOpen] = useState(false);

    let [loading, setLoading] = useState(false)

    let avatarRef = useRef<HTMLInputElement>(null)

    let licenseRef = useRef<HTMLInputElement>(null)

    let yearNow = new Date().getFullYear()

    let [message, setMessage] = useState('')

    let [urlImg, setUrlImg] = useState('')
    let [urlImgLicense, setUrlImgLicense] = useState('')
    let [typeLicense, setTypeLicense] = useState('')
    let [status, setStatus] = useState(true)

    let[avatar1, setAvatar] = useState('')
    let[license1, setLicense1] = useState('')

    let { user } = useSelector((store: StateStore) => store.auth)
    useEffect(() => {
        (async () => {
            if (user) {
                let inf = await authService.getInfo(user.id)
                let date = new Date(inf.data.doB)
                inf.data.day = date.getDate()
                inf.data.month = date.getMonth() + 1
                inf.data.year = date.getFullYear()
                setForm(inf.data)
                // setForm(...inf.data, sex: 0)
                // changeDate()
                let date1 = new Date(form.year, form.month, 0)
                setCountDay(date1.getDate())
                // setLoading(false)
            }
            let retailer = await authService.getRetailerById(user?.actorId || '')
            if (retailer && retailer.data) {
                setStatus(retailer.data.isActive)

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

    }, [form.month, form.year])

    useEffect(() => {
        // console.log(form.avatarFile)
        if (form.avatarFile) {
            var reader = new FileReader();
            reader.readAsDataURL(form.avatarFile);
            reader.onloadend = function () {
                var base64String = reader.result;
                // console.log('Base64 String - ', base64String);
                if (base64String) {
                    form.avatar = base64String.toString()
                    setUrlImg(base64String.toString())
                    // console.log('Base64 String without Tags- ',
                    //     base64String.toString().substr(base64String.toString().indexOf(', ') + 1));
                }
            }
        }

    }, [urlImg])

    useEffect(() => {
        // console.log(form.businessLicenseFile)
        if (form.businessLicenseFile) {
            var reader = new FileReader();
            reader.readAsDataURL(form.businessLicenseFile);
            reader.onloadend = function () {
                var base64String = reader.result;
                console.log('Base64 String - ', base64String);
                if (base64String) {
                    form.businessLicense = base64String.toString()
                    setUrlImgLicense(base64String.toString())
                    // setTypeLicense( base64String.slice(start, end).toString())

                    // console.log("abciaudvbyvuwevbk: ", base64String.slice(start, end).toString())
                }


            }
        }
        // changeLicense(form.businessLicenseFile)
    }, [urlImgLicense])


    // useEffect(() => {
    //     // setLoading(true)
    //     let license = form.businessLicenseFile
    //     console.log('LICENSE: ', license)
    //     if (license) {
    //         // setLicen(license.name)
    //         setLoading(true)
    //         const storageRef = ref(storage, `/licenses/${user?.id}`);
    //         const uploadTask = uploadBytesResumable(storageRef, license);
    //         uploadTask.on('state_changed',
    //             (snapshot) => {
    //             },
    //             (error) => {
    //             },
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //                     console.log('File available at', downloadURL);
    //                     // setForm({ ...form, businessLicense: downloadURL })
    //                     setForm({ ...form, businessLicense: downloadURL })
    //                     setLoading(false)
    //                     let user = await authService.getInfo(form.id)
    //                     if (user.data.businessLicense) {
    //                         // setMessage('')
    //                         // setOpen(true)
    //                     }

    //                 })
    //             }
    //         )
    //     }
    // }, [form.businessLicenseFile])


    const submit = async (form: Form) => {
        setLoading(true)
        form.doB = `${form.year}/${form.month > 9 ? '' : '0'}${form.month}/${form.day > 9 ? '' : '0'}${form.day}`;
        // if (form.businessLicense) {
        //     changeLicense(form.businessLicense)
        // }
        if (form.avatarFile) {
            changeAvatar(form.avatarFile)
            // form.avatar = avatar
            console.log('AHUHU')
        }
        if (form.businessLicenseFile) {
            changeLicense(form.businessLicenseFile)
            // form.businessLicense = license
            console.log('AHUHU')
        }
        console.log('FORM PHASE 2: ', form)
        let profile = await authService.updateProfile(form)
        // setLoading(false)
        if (profile.succeeded) {
            dispatch(updateInfo(form))
            setMessage(t('Update successfully'))
        } else {
            setMessage(t('Fail to update'))
        }
        
        // console.log('FORM PHASE 2: ', form)
    }
    // if (state) {
    //     return <LoadingPage />
    // }

    const changeAvatar = (file?: File) => {
        setLoading(true)
        let avatar = file
        if (avatar) {
            const storageRef = ref(storage, `/avatars/${user?.id}`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // console.log('File available at', downloadURL);
                        // setForm({ ...form, avatar: downloadURL })
                        // setAvatar(downloadURL)
                        setLoading(true)
                        form.avatar = downloadURL
                        let profile = await authService.updateProfile(form)
                        console.log('UPLOAD AVATAR:  AAAAAAAAAAAA')
                        console.log('UPLOAD LICENSE:', profile)
                        if(profile) {
                            setLoading(false)
                            setOpen(true)
                        }
                        // setLoading(true)
                        // let user = await authService.getInfo(form.id)
                        // console.log("HELLO WORLD: ", user)
                        // if (user.data.avatar) {
                        //     setOpen(true)
                        // }
                        // setLoading(false)
                    })
                }
            )
        }
    }

    const changeLicense = (file?: File) => {
        setLoading(true)
        let license = file
        console.log('LICENSE: ', license)
        if (license) {
            // setLicen(license.name)
            const storageRef = ref(storage, `/licenses/${user?.id}`);
            const uploadTask = uploadBytesResumable(storageRef, license);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        setLoading(true)
                        // setForm({ ...form, businessLicense: downloadURL })
                        // setForm({ ...form, businessLicense: downloadURL })
                        // console.log('LICENSE: ', form.businessLicense)
                        // setLicense1(downloadURL)
                        // console.log('DOWNLOAD: ', license1)
                        form.businessLicense = downloadURL
                        let profile = await authService.updateProfile(form)
                        console.log('UPLOAD LICENSE:  BBBBBBBBBBBB')
                        console.log('UPLOAD LICENSE:', profile)
                        if(profile) {
                            setLoading(false)
                            setOpen(true)
                        }
                        // if(profile) {
                        //     console.log('abcdef')
                        // }
                        // setLoading(false)
                        // let user = await authService.getInfo(form.id)
                        // if (user.data.businessLicense) {
                            
                        // }

                    })
                }
            )
        }
    }

    // console.log('USER: ', user)
    // console.log('STATUS: ', status)
    console.log('FORM: ', form)
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
                        {message.length > 0 ? message : 'Cập nhật ảnh thành công'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t('Click outside the notification window to turn it off')}
                    </Typography>
                </Box>
            </Modal>
        )
    }
    console.log(form)
    return (
        <>
            <Breadcrumbs list={[
                {
                    title: `${t('Home')}`,
                    link: '/'
                },
                {
                    title: `${t('Information')}`,
                    link: '/account/info'
                },

            ]} />
            <form onSubmit={handleSubmit(submit)}>
                <div className="row">
                    {!loading ? (
                        <>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group" style={{ textAlign: 'center' }}>
                                    {/* <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />  */}
                                    <img className='avatar' src={form.avatar || '/img/avatar.jpg'} alt="" onClick={() => { avatarRef.current?.dispatchEvent(new MouseEvent('click')) }} />
                                    <input type="file" className='form-control form-control-sm' style={{ display: 'none' }} ref={avatarRef} accept="image/*" {...register('avatarFile')} />

                                </div>
                            </div>

                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    {form.displayName ? <label htmlFor="accountFirstName">
                                        {t('Full name')} *
                                    </label> : <Skeleton width='30%' height={35} />}
                                    {form.displayName ? <input className="form-control form-control-sm" id="accountFirstName" type="text"  {...register('displayName', { required: true })} /> : <Skeleton width='100%' height={75} />}
                                </div>
                            </div>
                            <ErrorInput error={error.displayName} />
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    {form.email ? <label htmlFor="accountEmail">
                                        Email *
                                    </label> : <Skeleton width='30%' height={35} />}
                                    {form.email ? <input className="form-control form-control-sm" id="accountEmail" type="email"    {...register('email', { pattern: 'email', required: true })} /> : <Skeleton width='100%' height={75} />}
                                </div>
                                <ErrorInput error={error.email} />
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    {form.address ? <label htmlFor="accountEmail">
                                        {t('Address')} *
                                    </label> : <Skeleton width='30%' height={35} />}
                                    {form.address ? <input className="form-control form-control-sm" id="accountEmail" type="text"    {...register('address', { required: true, min: 5 })} /> : <Skeleton width='100%' height={75} />}
                                </div>
                                <ErrorInput error={error.address} />
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="form-group">
                                    {
                                        form.id ? <label htmlFor="accountPassword">
                                            {t('Old password')}
                                        </label> : <Skeleton width='30%' height={35} />
                                    }
                                    {
                                        form.id ? <input className="form-control form-control-sm" id="accountPassword" type="password"  {...register('oldPassword', { min: 6, max: 30, required: true })} /> : <Skeleton width='100%' height={75} />
                                    }

                                </div>
                                <ErrorInput error={error.oldPassword} />
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="form-group">
                                    {
                                        form.roleId ? <label htmlFor="AccountNewPassword">
                                            {t('New password')}
                                        </label> : <Skeleton width='30%' height={35} />
                                    }
                                    {
                                        form.roleId ? <input className="form-control form-control-sm" id="AccountNewPassword" type="password"  {...register('newPassword', { min: 6, max: 30, required: true })} /> : <Skeleton width='100%' height={75} />
                                    }
                                </div>
                                <ErrorInput error={error.newPassword} />
                            </div>
                            <div className="col-12 col-lg-7">
                                {/* Birthday */}
                                <div className="form-group">
                                    {/* Label */}
                                    {form.doB ? <label>{t('Date of birth')}</label> : <Skeleton width="60%" height={24} />}
                                    {/* Inputs */}
                                    {form.doB ? (<div className="form-row">
                                        <div className="col-auto">
                                            {/* Date */}
                                            <label className='sr-only' htmlFor="accountDate">
                                                {t('Day')}
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
                                                {t('Month')}
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
                                            {t('Year')}          
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
                                    {form.sex ? <label>{t('Gender')}</label> : <Skeleton width="60%" height={24} />}
                                    {form.sex ? (<div className="btn-group-toggle" data-toggle="buttons">
                                        <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_MALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_MALE })}>
                                            <input type="radio" name="gender" /> {t('Male')}
                                        </label>
                                        <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_FEMALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_FEMALE })}>
                                            <input type="radio" name="gender" /> {t('Female')}
                                        </label>
                                    </div>) : <Skeleton className='btn-group-toggle' height={51} />}
                                </div>
                            </div>
                            <div className="col-12">
                                {form.id ? <label htmlFor="accountEmail">
                                    {t('License')}
                                </label> : <Skeleton width='30%' height={35} />}
                                <div className="form-group" >
                                    {/* <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />  */}
                                    {/* {
                                        form.businessLicense ? (isFile === true ? <a href={form.businessLicense}>{form.businessLicense}</a> : <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense || '/img/file.png'} alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} />) : ''
                                    } */}
                                    {
                                        form.businessLicense && <>
                                            {/* <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense || '/img/file.png'} alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} /> */}
                                            <a href={form.businessLicense} style={{ width: '100%' }} >{form.businessLicense}</a><br />
                                        </>
                                    }
                                    {/* {!loading ? (isFile === true ? <a href={form.businessLicense}>{form.businessLicense}</a> : <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense } alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} />) : <LoadingAvatar />} */}
                                    {form.id ? <input type="file" className='form-control form-control-sm' ref={licenseRef} accept="image/*, application/pdf" disabled={status === true ? true : false} hidden={status === true ? true : false} {...register('businessLicenseFile')} /> : <Skeleton width='100%' height={75} />}
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    {form.email ? <label htmlFor="accountEmail">
                                        {t('Tax')}
                                    </label> : <Skeleton width='30%' height={35} />}
                                    {form.id ? <input className="form-control form-control-sm" type="text" disabled={status === true ? true : false} {...register('taxId', { required: true, min: 10, max: 10 }, { required: 'Cần nhập mã sô thuế', min: 'Mã số thuế cần 10 ký tự', max: 'Mã số thuế cần 10 ký tự' })} /> : <Skeleton width='100%' height={75} />}
                                </div>
                                <ErrorInput error={error.taxId} />
                            </div>
                            <div className="col-12">
                                {/* Button */}
                                <button className="btn btn-dark" type="submit" disabled={form.id ? false : true}>{t('Save')}</button>
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
