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
            if (!form.businessLicense) {
                delete initRule.businessLicense 
                // delete initRule.taxId
            }
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
        if (form.avatarFile) {
            var reader = new FileReader();
            reader.readAsDataURL(form.avatarFile);
            reader.onloadend = function () {
                var base64String = reader.result;
                if (base64String) {
                    form.avatar = base64String.toString()
                    setUrlImg(base64String.toString())

                }
            }
        }
    }, [urlImg, form.avatarFile])

    useEffect(() => {
        if (form.businessLicenseFile) {
            var reader = new FileReader();
            reader.readAsDataURL(form.businessLicenseFile);
            reader.onloadend = function () {
                var base64String = reader.result;
                if (base64String) {
                    form.businessLicense = base64String.toString()
                    setUrlImgLicense(base64String.toString())
                }
            }
        }
    }, [urlImgLicense])


    


    const submit = async (form: Form) => {
        setLoading(true)
        form.doB = `${form.year}/${form.month > 9 ? '' : '0'}${form.month}/${form.day > 9 ? '' : '0'}${form.day}`;
        
        if (form.avatarFile) {
            form.avatar = await changeAvatar(form.avatarFile)
        }
        if (form.businessLicenseFile) {
            form.businessLicense = await changeLicense(form.businessLicenseFile)
        }
        console.log('FORM PHASE 2: ', form)

        let profile = await authService.updateProfile(form)
        
        if (profile.succeeded) {
            setLoading(false)
            dispatch(updateInfo(form))
            setMessage(t('Update successfully'))
        } else {
            setMessage(t('Fail to update'))
        }
        setOpen(true)
    }
    

    const changeAvatar = async (file: File) : Promise<any> => {
        // // setLoading(true)
        // let avatar = file.avatarFile  as any
        if (file) {
            return new Promise((res, rej) => {
                const storageRef = ref(storage, `/avatars/${user?.id}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        rej()
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: string) => {
                            setForm({...form, avatar: downloadURL})
                            res(downloadURL)
                        })
                    }
                )
            })
            
        }
        return ''
    }

    const changeLicense = async (file: File) : Promise<any> => {
        // setLoading(true)
        // let license = file.businessLicenseFile as any
        // console.log('LICENSE: ', license)
        if (file) {
            // setLicen(license.name)
            return new Promise((res, rej) => {
                const storageRef = ref(storage, `/licenses/${user?.id}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        rej()
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: string) => {
                            console.log('File available at', downloadURL);                       
                            setForm({...form, businessLicense: downloadURL})
                            res(downloadURL)
                        })
                    }
                )
            })
        }
        return ''

    }

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
                                    <label htmlFor="accountFirstName">
                                        {t('Full name')} *
                                    </label> 
                                    <input className="form-control form-control-sm" id="accountFirstName" type="text"  {...register('displayName', { required: true }, { required: 'Họ tên không được để trống' })} /> 
                                </div>
                            </div>
                            <ErrorInput error={error.displayName} />
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        Email *
                                    </label> 
                                    <input className="form-control form-control-sm" id="accountEmail" type="email"    {...register('email', { pattern: 'email', required: true }, { required: 'Email không được để trống' })} /> 
                                </div>
                                <ErrorInput error={error.email} />
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        {t('Address')} *
                                    </label> 
                                    <input className="form-control form-control-sm" id="accountEmail" type="text"    {...register('address', { required: true }, { required: 'Địa chỉ không được để trống' })} />
                                </div>
                                <ErrorInput error={error.address} />
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="form-group">
                                    {
                                        <label htmlFor="accountPassword">
                                            {t('Old password')}
                                        </label> 
                                    }
                                    {
                                        <input className="form-control form-control-sm" id="accountPassword" type="password"  {...register('oldPassword', { min: 6, max: 30, required: true }, { min: "Mật khẩu cũ ít nhất 6 ký tự", max: "Mật khẩu cũ nhiều nhất 30 ký tự", required: "Mật khẩu cũ không được để trống" })} /> 
                                    }

                                </div>
                                <ErrorInput error={error.oldPassword} />
                            </div>
                            <div className="col-12 col-md-6">

                                <div className="form-group">
                                    <label htmlFor="AccountNewPassword">
                                            {t('New password')}
                                        </label> 
                                        <input className="form-control form-control-sm" id="AccountNewPassword" type="password"  {...register('newPassword', { min: 6, max: 30, required: true }, { min: "Mật khẩu mới ít nhất 6 ký tự", max: "Mật khẩu mới nhiều nhất 30 ký tự", required: "Mật khẩu mới không được để trống" })} /> 
                                </div>
                                <ErrorInput error={error.newPassword} />
                            </div>
                            <div className="col-12 col-lg-7">
                                {/* Birthday */}
                                <div className="form-group">
                                    {/* Label */}
                                   <label>{t('Date of birth')}</label>
                                    {/* Inputs */}
                                    <div className="form-row">
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
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5">
                                {/* Gender */}
                                <div className="form-group mb-8">
                                    <label>{t('Gender')}</label>
                                   <div className="btn-group-toggle" data-toggle="buttons">
                                        <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_MALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_MALE })}>
                                            <input type="radio" name="gender" /> {t('Male')}
                                        </label>
                                        <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_FEMALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_FEMALE })}>
                                            <input type="radio" name="gender" /> {t('Female')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="accountEmail">
                                    {t('License')}
                                </label> 
                                <div className="form-group" >
                                    {/* <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />  */}
                                    {/* {
                                        form.businessLicense ? (isFile === true ? <a href={form.businessLicense}>{form.businessLicense}</a> : <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense || '/img/file.png'} alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} />) : ''
                                    } */}
                                    
                                            {/* <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense || '/img/file.png'} alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} /> */}
                                            <a href={form.businessLicense} style={{ width: '100%' }} >{form.businessLicense}</a><br />
                                       
                                    {/* {!loading ? (isFile === true ? <a href={form.businessLicense}>{form.businessLicense}</a> : <img style={{ width: '50%', padding: '10px 0px' }} src={form.businessLicense } alt="" onClick={() => { licenseRef.current?.dispatchEvent(new MouseEvent('click')) }} />) : <LoadingAvatar />} */}
                                    <input type="file" className='form-control form-control-sm' ref={licenseRef} accept="image/*, application/pdf" disabled={status === true ? true : false} hidden={status === true ? true : false} {...register('businessLicenseFile')} /> 
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        {t('Tax')}
                                    </label> 
                                    <input className="form-control form-control-sm tax-number" type="number" disabled={status === true ? true : false} {...register('taxId', { required: true, min: 10, max: 10, pattern: 'tax' }, { required: 'Cần nhập mã sô thuế', min: 'Mã số thuế cần 10 ký tự', max: 'Mã số thuế cần 10 ký tự', pattern: 'Mã số thuế chỉ chấp nhận số' })} /> 
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
