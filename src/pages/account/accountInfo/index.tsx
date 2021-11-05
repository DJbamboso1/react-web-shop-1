import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateStore } from 'store'
import { useForm } from 'core'
import ErrorInput from 'components/ErrorInput'
import { User } from '@types'
import authService from 'services/authService'
import { data } from 'flickity'

type Form = User['data']

const TYPE_MALE = 0
const TYPE_FEMALE = 1

const AccountInfo: React.FC = () => {

    let [countDay, setCountDay] = useState<number>(0)

    let monthRef = useRef<any>()
    let yearRef = useRef<any>()

    let { register, setForm, handleSubmit, error, form } = useForm<Form>()
    let { user } = useSelector((store: StateStore) => store.auth)
    useEffect(() => {
        changeDate();
        (async () => {
            if (user?.data) {
                let inf = await authService.getInfo(user.data.id)
                // setInfo(inf)
                setForm(inf.data)
            }
        })()
    }, [])

    function changeDate() {
        let month = monthRef.current.value
        let year = yearRef.current.value
        let date = new Date(year, month, 0)
        setCountDay(date.getDate())
    }

    const submit = (form: Form) => {
        // console.log(form)
    }
    let yearNow = new Date().getFullYear()
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="row">
                <div className="col-12">
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="accountFirstName">
                            Full Name *
                        </label>
                        <input className="form-control form-control-sm" id="accountFirstName" type="text" placeholder="First Name *" {...register('displayName')} />
                    </div>
                </div>
                <ErrorInput error={error.displayName} />
                <div className="col-12">
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="accountEmail">
                            Email Address *
                        </label>
                        <input className="form-control form-control-sm" id="accountEmail" type="email" placeholder="Email Address *"   {...register('email', { pattern: 'email' })} />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="accountPassword">
                            Current Password *
                        </label>
                        <input className="form-control form-control-sm" id="accountPassword" type="password" placeholder="Current Password *" />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="AccountNewPassword">
                            New Password *
                        </label>
                        <input className="form-control form-control-sm" id="AccountNewPassword" type="password" placeholder="New Password *" />
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    {/* Birthday */}
                    <div className="form-group">
                        {/* Label */}
                        <label>Date of Birth</label>
                        {/* Inputs */}
                        <div className="form-row">
                            <div className="col-auto">
                                {/* Date */}
                                <label className="sr-only" htmlFor="accountDate">
                                    Date
                                </label>
                                <select className="custom-select custom-select-sm" id="accountDate">
                                    {
                                        [...Array(countDay)].map((e, i) => <option value={i + 1}>{i + 1}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col">
                                {/* Date */}
                                <label className="sr-only" htmlFor="accountMonth">
                                    Month
                                </label>
                                <select className="custom-select custom-select-sm" id="accountMonth" ref={monthRef} onChange={changeDate}>
                                    {
                                        [...Array(12)].map((e, i) => <option value={i + 1}>{i + 1}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-auto">
                                {/* Date */}
                                <label className="sr-only" htmlFor="accountYear">
                                    Year
                                </label>
                                <select className="custom-select custom-select-sm" id="accountYear" ref={yearRef} onChange={changeDate}>
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
                <div className="col-12 col-lg-6">
                    {/* Gender */}
                    <div className="form-group mb-8">
                        <label>Gender</label>
                        <div className="btn-group-toggle" data-toggle="buttons">
                            <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_MALE ? 'active': ''}`} onClick={e => setForm({...form, sex: TYPE_MALE})}>
                                <input type="radio" name="gender"  /> Male
                            </label>
                            <label className={`btn btn-sm btn-outline-border ${form.sex === TYPE_FEMALE ? 'active': ''}`} onClick={e => setForm({...form, sex: TYPE_FEMALE})}>
                                <input type="radio" name="gender" /> Female
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {/* Button */}
                    <button className="btn btn-dark" type="submit">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default AccountInfo
