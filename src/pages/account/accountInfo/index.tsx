import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateStore } from 'store'
import { useForm } from 'core'
import ErrorInput from 'components/ErrorInput'
import { User } from '@types'
import authService from 'services/authService'
import { data } from 'flickity'
import LoadingPage from 'components/LoadingPage'
import { Skeleton } from '@mui/material'
import { ref, getDownloadURL, storage, uploadBytesResumable, uploadString } from 'utils/firebase'
import { authLogin, updateInfo } from 'store/actions/authAction'

type Form = User['data']

const TYPE_MALE = 0
const TYPE_FEMALE = 1

const AccountInfo: React.FC = () => {

    let dispatch = useDispatch()
    let [countDay, setCountDay] = useState<number>(0)
    let { register, setForm, handleSubmit, error, form } = useForm<Form>()
    let [mon, setMonth] = useState(1)
    let [yea, setYear] = useState(1)
    let [day, setDay] = useState(1)

    let avatarRef = useRef<HTMLInputElement>(null)

    let yearNow = new Date().getFullYear()

    let { user } = useSelector((store: StateStore) => store.auth)
    useEffect(() => {
        (async () => {
            if (user) {
                let inf = await authService.getInfo(user.id)
                let date = new Date(inf.data.doB)
                inf.data.day = date.getDate()
                inf.data.month = date.getMonth()
                inf.data.year = date.getFullYear()
                setMonth(date.getMonth())
                setDay(date.getDate())
                setYear(date.getFullYear())
                // setInfo(inf)
                setForm(inf.data)
                // changeDate()
                let date1 = new Date(form.year, form.month, 0)
                setCountDay(date1.getDate())
                console.log(inf.data)
            }
        })()
    }, [])

    useEffect(() => {
        let month = form.month
        let year = form.year
        let date = new Date(year, month, 0)
        setCountDay(date.getDate())
        console.log(month)
        console.log(year)
        console.log(countDay)
    }, [form.month, form.year])


    const submit = async (form: Form) => {
        // let formData = new FormData()
        // let i: keyof typeof form;
        // for (i in form) {
        //     if (i === 'avatar') {
        //         formData.append(i, form[i])
        //     }
        //     else if (i === 'doB') {
        //         formData.append(i, `${form.year}/${form.month}/${form.day}`)
        //     }
        //     else {
        //         formData.append(i, form[i].toString())
        //     }
        // }
        form.doB = `${form.year}/${form.month}/${form.day}`
        console.log(form.doB)
        let profile = await authService.updateProfile(form)
        if (profile.succeeded) {
            dispatch(updateInfo(form))
        }
        console.log('PROFILE: ', profile)
    }
    // if (state) {
    //     return <LoadingPage />
    // }

    const changeAvatar = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let avatar = ev.currentTarget.files?.[0]
        if (avatar) {
            const storageRef = ref(storage, 'avatar/');
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setForm({ ...form, avatar: downloadURL })
                        // console.log('Download', downloadURL)
                    })
                }
            )
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="row">
                <div className="col-12">
                    {/* Email */}
                    <div className="form-group">

                        {/* <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />  */}
                        <img src={form.avatar || '/img/avatar.jpg'} alt="" onClick={() => { avatarRef.current?.dispatchEvent(new MouseEvent('click')) }} />
                        <input type="file" style={{ display: 'none' }} ref={avatarRef} onChange={changeAvatar} />
                    </div>
                </div>
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
                <div className="col-12 col-md-6">
                    {/* Password */}
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
                    {/* Password */}
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
                </div>
                <div className="col-12 col-lg-7">
                    {/* Birthday */}
                    <div className="form-group">
                        {/* Label */}
                        <label>Date of Birth</label>
                        {/* Inputs */}
                        <div className="form-row">
                            <div className="col-auto">
                                {/* Date */}
                                <label className='sr-only' htmlFor="accountDate">
                                    Day
                                </label>
                                <select className="custom-select custom-select-sm" id="accountDate" {...register('day')}  >
                                    {
                                        [...Array(countDay)].map((e, i) => <option value={i + 1}>{i + 1}</option>)
                                    }
                                </select>
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
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    {/* Gender */}
                    <div className="form-group mb-8">
                        <label>Gender</label>
                        <div className="btn-group-toggle" data-toggle="buttons">
                            <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_MALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_MALE })}>
                                <input type="radio" name="gender" /> Male
                            </label>
                            <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_FEMALE ? 'active' : ''}`} onClick={e => setForm({ ...form, sex: TYPE_FEMALE })}>
                                <input type="radio" name="gender" /> Female
                            </label>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12">
                    
                    <div className="form-group">
                        {form.displayName ? <label htmlFor="accountFirstName">
                            Avatar *
                        </label> : <Skeleton width='30%' height={35} />}
                        <input className="form-control form-control-sm" id="accountFirstName" type="file" placeholder="First Name *" {...register('avatar')} />
                    </div>
                </div> */}
                <div className="col-12">
                    {/* Button */}
                    <button className="btn btn-dark" type="submit">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default AccountInfo
