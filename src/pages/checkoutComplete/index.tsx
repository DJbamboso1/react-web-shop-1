import { Session, Session1 } from '@types'
import LoadingPage from 'components/LoadingPage'
import { history } from 'core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { orderService } from 'services/orderService'
import { sessionService } from 'services/sessionService'
import { cartRemoveAll } from 'store/actions/cartAction'
import { convertQueryURLToObject } from '../../utils'

export type FilterQuery = {
    // page: string,
    partnerCode?: string
    orderId?: string
    requestId?: string
    amount?: string
    orderInfo?: string
    orderType?: string
    transId?: string
    resultCode?: string
    message?: string
    payType?: string
    responseTime?: string
    extraData?: string
    signature?: string
}

const CheckoutCompleteComponent: React.FC = () => {
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(true)
    let queryUrl = convertQueryURLToObject<FilterQuery>()
    let [check, setCheck] = useState<boolean>()
    let [session, setSession] = useState<Session1>()
    // console.log(queryUrl)
    let { slug } = useParams<{ slug: string }>()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    useEffect(() => {
        (async () => {
            try {
                if (queryUrl.orderId) {
                    let obj = await sessionService.getSessionById(queryUrl.orderId)
                    if (obj) {
                        setSession(obj)
                        setLoading(false)
                    } else {
                        history.push('/')
                    }
                } else if (slug) {
                    let obj = await sessionService.getSessionById(slug)
                    if (obj) {
                        setSession(obj)
                        setLoading(false)
                    } else {
                        history.push('/')
                    }
                } else {
                    history.push('/')
                }
            } catch (e) {
                history.push('/')
            }
        })()
    }, [check])
    console.log('slug: ', slug)
    console.log('queryUrl: ', queryUrl)
    return (
        <section className="py-12 orderComplete">
            {!loading ? (
                slug ? (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                <div className="mb-7 font-size-h1">{session ? '❤️' : '😞'}</div>
                                <h2 className="mb-5">Đặt hàng {session ? 'thành công!' : 'thất bại'}</h2>
                                {
                                    session ? (<>
                                        <Link className="btn btn-dark" to='#' onClick={() => { history.push(`/`) }}>
                                            Quay về trang chủ
                                        </Link>
                                    </>) : ''
                                }
                            </div>
                        </div>
                    </div>
                ) : <>
                    {
                        queryUrl &&
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                    <div className="mb-7 font-size-h1">{queryUrl.resultCode === '0' ? '❤️' : '😞'}</div>
                                    <h2 className="mb-5">{queryUrl.resultCode === '0' ? 'Đặt hàng thành công!' : 'Đơn hàng đã hủy'}</h2>
                                    {
                                        session ? (<>
                                            <Link className="btn btn-dark" to='#' onClick={() => { history.push(`/`) }}>
                                                Quay về trang chủ
                                            </Link>
                                        </>) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </>
            ) : <LoadingPage />}
        </section>
    )
}

export default CheckoutCompleteComponent
