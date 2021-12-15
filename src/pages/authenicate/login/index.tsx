import ErrorInput from 'components/ErrorInput'
import { useForm, useTranslate } from 'core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StateStore } from 'store'
import { authFetchAction } from 'store/actions/authAction'
import { Redirect } from 'react-router-dom'
import { orange } from '@mui/material/colors'
import LoadingPage from 'components/LoadingPage'
import LoadingButton from 'components/LoadingButton'

type Form = {
    username: string
    password: string
}


const Login: React.FC = () => {
    let { t } = useTranslate()
    let { errorMsg, login, role } = useSelector((store: StateStore) => store.auth)
    let { register, form, handleSubmit, error } = useForm<Form>()
    let [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const submit = (form: Form) => {
        // console.log(form)  
        dispatch(authFetchAction(form))
        setLoading(true)
        // setStatus(true)
    }
    // let { login } = useSelector((store: StateStore) => store.auth)


    if (login && role) {
        switch (role) {
            case 'Retailer': {
                
                return <Redirect to='/' />
            }
        }
    }
    

    return (
        // <div className="card card-lg mb-10 mb-md-0" style={{ maxWidth: 700, margin: '0 auto' }}>
        //     <div className="card-body">
        //         <h3 className="mb-7">Welcome to <span style={{ color: 'orange' }}>GECKO !</span> <ErrorInput error={errorMsg} /></h3>
        //         <form onSubmit={handleSubmit(submit)}>
        //             <div className="row">
        //                 <div className="col-12">

                            // <div className="form-group">
                            //     <label className="sr-only" htmlFor="loginEmail">
                            //         Email Address *
                            //     </label>
                            //     <input className="form-control form-control-sm" id="loginEmail" type="text" placeholder="Email Address *"   {...register('username', { required: true })} />
                            //     <ErrorInput error={error.username} />
                            // </div>
        //                 </div>
        //                 <div className="col-12">                      
        //                     <div className="form-group">
        //                         <label className="sr-only" htmlFor="loginPassword">
        //                             Password *
        //                         </label>
        //                         <input {...register('password', { min: 6, max: 32 })} className="form-control form-control-sm" id="loginPassword" type="password" placeholder="Password *" />
        //                         <ErrorInput error={error.password} />
        //                     </div>
        //                 </div>
        //                 <div className="col-12 col-md">
        //                     <div className="form-group">
        //                         <p>{t(`Dont't have a account?`)} <Link to="/register">Register</Link></p>
        //                     </div>
        //                 </div>                
        //                 <div className="col-12">
        //                     <button className="btn btn-sm btn-dark" type="submit">
        //                         Sign in  
        //                     </button>
        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div style={{ backgroundColor: 'rgb(15, 9, 57)' }}>
            <div className="limiter" >
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleSubmit(submit)}>
                            <span className="login100-form-title p-b-43">
                                {t('Welcome to GECKO !')}
                            </span>
                            <ErrorInput error={errorMsg}/>
                            <div className="wrap-input100" >
                                
                            <input className={`input100 ${form.username && form.username.length > 0 && 'has-val'}`} type="text" {...register('username', { required: true, pattern: 'username', min: 6, max: 12 }, { required: 'Tài khoản không được để trống !', pattern: 'Yêu cầu tài khoản không chứa các ký tự đặt biệt', min: 'Yêu cầu tài khoản có ít nhất 6 ký tự', max: 'Yêu cầu tài khoản có nhiều nhất 12 ký tự' })} />
                                <span className="focus-input100" />
                                <span className="label-input100">{t('Username')}<span style={{color: 'red'}}>* </span></span>
                            </div>
                            <ErrorInput error={error.username} />
                            <div className="wrap-input100">
                                <input {...register('password', { min: 6, max: 20, required: true, pattern: 'password' }, { required: 'Mật khẩu không được để trống', min: 'Mật khẩu có ít nhất 6 ký tự', max: 'Mất khẩu có nhiều nhất 20 ký tự', pattern: 'Yêu cầu mật khẩu không chứa các ký tự đặt biệt' })} className={`input100 ${form && form.password.length > 0 && 'has-val'}`} type="password" />
                                <span className="focus-input100" />
                                <span className="label-input100">{t('Password')}<span style={{color: 'red'}}>* </span> </span>
                            </div>
                            <ErrorInput error={error.password} />
                            <div className="flex-sb-m w-full p-t-3 p-b-32">
                                <div>
                                <p className='txt1'>{t(`Don't have an account yet ?`)} <Link to="/auth/register" style={{fontWeight: 'bold'}}>{t('Register')}</Link></p>
                                </div>
                                
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type='submit'>
                                    {t('Login')}
                                </button>
                            </div>
                        </form>
                        <div className="login100-more" style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/gecko-b3c27.appspot.com/o/background%2FLOGO.png?alt=media&token=b695b258-dadd-4812-af32-e261ad92643e)' }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
