import { UserRegister } from '@types'
import ErrorInput from 'components/ErrorInput'
import { useForm, useTranslate } from 'core'
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

    // useEffect(() => {
    //     changeDate()
    // }, [])

    let { register, form, handleSubmit, error, setForm } = useForm<RegisterForm>()

    function changeDate() {
        let month = form.month
        let year = form.year
        let date = new Date(year, month, 0)
        setCountDay(date.getDate())
    }

    const submit = (form: RegisterForm) => {

        let user = {
            roleId: '0da11b44-e78d-4466-86b4-b62984b8549e',
            username: form.username,
            displayName: form.displayName,
            password: form.password,
            doB: `${form.year ? form.year : yearNow}/${form.month ? form.month : 1}/${form.day ? form.day : 1}`,
            avatar: '',
            sex: typeof form.sex === 'undefined' ? 1 : form.sex,
            email: form.email,
            phoneNumber: form.phoneNumber,
            address: form.address,
        }
        // formData.doB = `${form.year ? form.year : yearNow}/${form.month ? form.month : 1}/${form.day ? form.day : 1}`
        console.log(form);
        (async () => {
            let obj = await authService.register(user)
            console.log(typeof obj.data)
            
            if (obj && obj.succeeded === true) {
                let retailer = await authService.registerRetailer({ userId : obj.data })

                if (retailer && retailer.succeeded === true) {
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                    return <Redirect to='/' />
                }
            } else {
                setErrorMsg('Đăng ký không thành công')
            }
        })()
    }


    return (
        <div className="card card-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
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
                                <input className="form-control form-control-sm" id="registerEmail" type="text"  {...register('username', { required: true })} />
                                <ErrorInput error={error.email} />

                            </div>
                        </div>
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                <label className="" htmlFor="registerFirstName">
                                    Display Name *
                                </label>
                                <input className="form-control form-control-sm" id="registerFirstName" type="text"  {...register('displayName', { required: true })} />
                                <ErrorInput error={error.displayName} />
                            </div>
                        </div>
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="accountEmail">
                                    Email *
                                </label>
                                <input className="form-control form-control-sm" id="accountEmail" type="email"   {...register('email', { required: true, pattern: 'email' })} />
                                <ErrorInput error={error.email} />
                            </div>
                        </div>
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="accountEmail">
                                    Phone number *
                                </label>
                                <input className="form-control form-control-sm" id="accountEmail" type="text"    {...register('phoneNumber', { required: true, pattern: 'phone' })} />
                                <ErrorInput error={error.phoneNumber} />
                            </div>
                        </div>
                        <div className="col-12">
                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="accountEmail">
                                    Address *
                                </label>
                                <input className="form-control form-control-sm" id="accountEmail" type="text"   {...register('address', { required: true })} />
                                <ErrorInput error={error.address} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Password */}
                            <div className="form-group">
                                <label className="" htmlFor="registerPassword">
                                    Password *
                                </label>
                                <input className="form-control form-control-sm" id="registerPassword" type="password"  {...register('password', { required: true, min: 6, max: 32 })} />
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
        </div>
    )
}

export default Register
