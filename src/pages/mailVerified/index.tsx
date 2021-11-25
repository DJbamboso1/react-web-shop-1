import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import authService from 'services/authService'
import { convertQueryURLToObject } from 'utils'

const MailVerified: React.FC = () => {
    // let { slug } = useParams<{ slug: string }>()
    // console.log(slug)
    let check = convertQueryURLToObject()
    let [active, setActive] = useState(false)
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            if (check.activationCode) {
                let actionActivate = await authService.vertificateEmail(check.activationCode)
                if (actionActivate.succeeded === true) {
                    setActive(true)
                    setLoading(false)
                } else {
                    setActive(false)
                    setLoading(false)
                }
            } else {
                setActive(false)
                setLoading(false)
            }
        })()
    }, [])
    console.log('CHECK ', check.activationCode)
    return (
        <div className="container">
            {
                !loading ? (
                    <>
                        {
                            active ? (
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center" style={{ padding: '50px 0px' }}>
                                        {/* Icon */}
                                        <div className="mb-7 font-size-h1">{'❤️'}</div>
                                        {/* Heading */}
                                        <h2 className="mb-5">Chúc mừng !</h2>
                                        {/* Text */}
                                        <p className="mb-7 text-gray-500">
                                            Tài khoản của bạn đã được kích hoạt !
                                        </p>
                                        <Link className="btn btn-dark" to='/auth/login'>
                                            Quay về trang đăng nhập
                                        </Link>
                                        {/* Button */}
                                    </div>
                                </div>
                            ) : (
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center" style={{ padding: '50px 0px' }}>
                                        {/* Icon */}
                                        <div className="mb-7 font-size-h1">{'😞'}</div>
                                        {/* Heading */}
                                        <h2 className="mb-5">Thất bại</h2>
                                        {/* Text */}
                                        <p className="mb-7 text-gray-500">
                                            Tài khoản đã được kích hoạt hoặc chưa được đăng ký 
                                        </p>
                                        <Link className="btn btn-dark" to='/auth/login'>
                                            Quay về trang đăng nhập
                                        </Link>
                                        {/* Button */}
                                    </div>
                                </div>
                            )
                        }
                    </>
                ) : <LoadingPage />
            }

        </div>
    )
}

export default MailVerified
