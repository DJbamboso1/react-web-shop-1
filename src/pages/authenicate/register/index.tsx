import { UserRegister } from '@types'
import ErrorInput from 'components/ErrorInput'
import LoadingPage from 'components/LoadingPage'
import { history, useForm, useTranslate } from 'core'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import authService from 'services/authService'

type RegisterForm = {
    roleId: string,
    username: string,
    displayName: string,
    password: string,
    confirmPassword: string,
    day: number,
    month: number,
    year: number,
    doB: string,
    avatar: string,
    sex: number,
    email: string,
    phoneNumber: string,
    address: string
}

const TYPE_MALE = 1
const TYPE_FEMALE = 2

const Register: React.FC = () => {
    let { t } = useTranslate()
    let [countDay, setCountDay] = useState<number>(0)
    const dispatch = useDispatch()
    let monthRef = useRef<any>()
    let yearRef = useRef<any>()
    let yearNow = new Date().getFullYear()
    let [errorMsg, setErrorMsg] = useState('')
    let [loading, setLoading] = useState(false)

    let [usernameError, setUsernameError] = useState('')
    let [mailError, setMailError] = useState('')

    // useEffect(() => {
    //     changeDate()
    // }, [])

    let { register, form, handleSubmit, error, setForm } = useForm<RegisterForm>()

    useEffect(() => {
        let month = form.month
        let year = form.year
        let date = new Date(year, month, 0)
        setCountDay(date.getDate())
        if (form.day > countDay) {
            form.day = 1
        }

    }, [form.month, form.year])

    const submit = async (form: RegisterForm) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setLoading(true)
        let user = {
            roleId: '0da11b44-e78d-4466-86b4-b62984b8549e',
            username: form.username,
            displayName: form.displayName,
            password: form.password,
            doB: `${form.year ? form.year : yearNow}/${form.month ? form.month : '01'}/${form.day ? form.day : '01'}`,
            avatar: '',
            sex: typeof form.sex === 'undefined' ? 1 : form.sex,
            email: form.email,
            phoneNumber: form.phoneNumber,
            address: form.address,
        };
        // formData.doB = `${form.year ? form.year : yearNow}/${form.month ? form.month : 1}/${form.day ? form.day : 1}`
        // console.log(form);

        let checkUsername = await authService.checkUsername(user.username)
        if (checkUsername.message === 'Username not Available') {
            
            error.username = 'Tài khoản đã tồn tại'
            setUsernameError(error.username)
        }
        let checkEmail = await authService.checkEmail(user.email)
        if (checkEmail.message === 'Email not Available') {
            error.email = 'Mail đã tồn tại'
            setMailError(error.email)
        }
        // console.log('ERROR: ', error.username?.length)
        if (!error.username && !error.email) {
            let obj = await authService.register(user)
            // console.log(obj)
            if (obj && obj.succeeded === true) {
                let retailer = await authService.registerRetailer({ userId: obj.data })
                // console.log('RESULT: ', retailer)
                if (retailer && retailer.succeeded === true) {
                    history.push('/auth/login')
                }
            } else {
                console.log('BUG')
                setErrorMsg('Đăng ký không thành công')
            }
        } else {
            console.log('BUG 1')
            setErrorMsg('Đăng ký không thành công')
        }
        setLoading(false)
    }


    return (
        <div className="card card-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            {!loading ? (
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">New Account</h6>
                    {errorMsg && <ErrorInput error={errorMsg} />}
                    {/* Form */}
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="row">

                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label className="" htmlFor="registerEmail">
                                        Username *
                                    </label>
                                    <input className="form-control form-control-sm" id="registerEmail" type="text"  {...register('username', { required: true, pattern: 'username', min: 5, max: 16 }, { required: 'Tài khoản không được để trống !', pattern: 'Yêu cầu tài khoản không chứa các ký tự đặt biệt', min: 'Tài khoản cần ít nhất 5 ký tự', max: 'Tài khoản cần nhiều nhất chỉ 16 ký tự' })} />
                                    <ErrorInput error={usernameError || error.username} />

                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label className="" htmlFor="registerFirstName">
                                        Display Name *
                                    </label>
                                    <input className="form-control form-control-sm" id="registerFirstName" type="text"  {...register('displayName', { required: true, min: 2, max: 30 }, { required: 'Họ tên không được để trống', min: 'Tên có ít nhất 2 ký tự', max: 'Tên có nhiều nhất chỉ 30 ký tự' })} />
                                    <ErrorInput error={error.displayName} />
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        Email *
                                    </label>
                                    <input className="form-control form-control-sm" id="accountEmail" type="text"   {...register('email', { required: true, pattern: 'email' }, { required: 'Mail không đuọc để trống', pattern: 'Mail không đúng định dạng' })} />
                                    <ErrorInput error={mailError || error.email} />
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        Phone number *
                                    </label>
                                    <input className="form-control form-control-sm" id="accountEmail" type="text"    {...register('phoneNumber', { required: true, pattern: 'phone' }, { required: 'Số điện thoại không được để trống', pattern: 'Số điện thoại không đúng định dạng , yêu cầu số điện thoại Việt Nam' })} />
                                    <ErrorInput error={error.phoneNumber} />
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="accountEmail">
                                        Address *
                                    </label>
                                    <input className="form-control form-control-sm" id="accountEmail" type="text"   {...register('address', { required: true }, { required: 'Địa chỉ không được để trống' })} />
                                    <ErrorInput error={error.address} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                {/* Password */}
                                <div className="form-group">
                                    <label className="" htmlFor="registerPassword">
                                        Password *
                                    </label>
                                    <input className="form-control form-control-sm" id="registerPassword" type="password"  {...register('password', { required: true, min: 6, max: 32 }, { required: 'Mật khẩu không được để trống !', min: 'Mật khẩu cần ít nhất 6 ký tự', max: 'Mật khẩu cần nhiều nhất chỉ 32 ký tự' })} />
                                    <ErrorInput error={error.password} />

                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                {/* Password */}
                                <div className="form-group">
                                    <label className="" htmlFor="registerPasswordConfirm">
                                        Confirm Password *
                                    </label>
                                    <input className="form-control form-control-sm" id="registerPasswordConfirm" type="password"  {...register('confirmPassword', { confirm: 'password' })} />
                                    <ErrorInput error={error.confirmPassword} />
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
                            {/* <div className="col-12 col-md-auto">
                           
                            <div className="form-group font-size-sm text-muted">
                                By registering your details, you agree with our Terms &amp; Conditions,
                                and Privacy and Cookie Policy.
                            </div>
                        </div> */}
                            {/* <div className="col-12 col-md">
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" id="registerNewsletter" type="checkbox" {...register('newLetter')} />
                                    <label className="custom-control-label" htmlFor="registerNewsletter">
                                        Sign me up for the Newsletter!
                                    </label>
                                </div>
                            </div>
                        </div> */}
                            <div className="col-12">
                                <p>{t(`Have a account?`)} <Link to="/">Login</Link></p>
                            </div>
                            <div className="col-12">
                                {/* Button */}
                                <button className="btn btn-sm btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : <LoadingPage />}
        </div>
    )
}

export default Register
