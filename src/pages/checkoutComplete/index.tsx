import { Session1 } from '@types'
import LoadingPage from 'components/LoadingPage'
import { history, useTranslate } from 'core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { paymentService } from 'services/paymentService'
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
    vnp_OrderInfo?: string
    vnp_ResponseCode?: string
}

const CheckoutCompleteComponent: React.FC = () => {
    let { t } = useTranslate()
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(true)
    let queryUrl = convertQueryURLToObject<FilterQuery>()
    let [session, setSession] = useState<Session1>()
    let [url] = useState(window.location.href)
    // console.log(queryUrl)
    let { slug } = useParams<{ slug: string }>()
    console.log(queryUrl)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    useEffect(() => {
        (async () => {
            if (queryUrl.vnp_OrderInfo && queryUrl.vnp_ResponseCode && parseInt(queryUrl.vnp_ResponseCode) === 0) {
                // let obj = await sessionService.getSessionById(queryUrl.vnp_OrderInfo)
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                let ps = await paymentService.vnPay(encodeURIComponent(url))
                dispatch(cartRemoveAll())
                localStorage.removeItem('cart')
                console.log("PS: ", ps)
                setLoading(false)

            } else if (queryUrl.orderId && queryUrl.resultCode && parseInt(queryUrl.resultCode) === 0) {
                console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
                let obj = await sessionService.getSessionById(queryUrl.orderId)
                
                    setSession(obj)
                    setLoading(false)
                    dispatch(cartRemoveAll())
                    localStorage.removeItem('cart')
                    // let ps = await paymentService.vnPay(url)
                    // console.log("PS: ", ps)
                
            } else if (slug) {
                console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
                let obj = await sessionService.getSessionById(slug)
                
                    setSession(obj)
                    setLoading(false)
                    dispatch(cartRemoveAll())
                    localStorage.removeItem('cart')
                    // let ps = await paymentService.vnPay(url)
                    // console.log("PS: ", ps)
                
            }
            else if (queryUrl.orderId && queryUrl.resultCode && parseInt(queryUrl.resultCode) !== 0) {
                console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
                let obj = await sessionService.getSessionById(queryUrl.orderId)
                
                    setSession(obj)
                    setLoading(false)
                
                    // let ps = await paymentService.vnPay(url)
                    // console.log("PS: ", ps)
                
            }
            else {
                let ps = await paymentService.vnPay(encodeURIComponent(url))
                console.log("PS 1: ", ps)
                setLoading(false)
                // history.push('/')
            }
        })()
    }, [])
    console.log('slug: ', slug)
    console.log('queryUrl: ', queryUrl)
    console.log('current url: ', window.location.href)
    console.log('link: ', window.location.href);
    // (async () => {
    //     let ps = await paymentService.vnPay(window.location.href)
    //     console.log("PS: ", ps)
    // })()
    return (
        <section className="py-12 orderComplete">
            {!loading ? (
                slug ? (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                <div className="mb-7 font-size-h1">{session ? '❤️' : '😞'}</div>
                                <h2 className="mb-5">{t('Order ')} {session ? `${t('Success')}!` : `${t('Fail')}!`}</h2>
                                {
                                    session ? (<>
                                        <Link className="btn btn-dark" to='#' onClick={() => {
                                            history.push(`/`);
                                            // (async () => {
                                            //     let ps = await paymentService.vnPay(window.location.href)
                                            //     console.log('ps: ', ps)
                                            // })()
                                            // console.log("PS: ", ps)
                                        }}>
                                            {t('Back to home page')}
                                        </Link>
                                    </>) : ''
                                }
                            </div>
                        </div>
                    </div>
                ) : <>
                    {
                        queryUrl && queryUrl.resultCode &&
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                    <div className="mb-7 font-size-h1">{parseInt(queryUrl.resultCode) === 0 ? '❤️' : '😞'}</div>
                                    <h2 className="mb-5">{t('Order ')} {parseInt(queryUrl.resultCode) === 0 ? `${t('Success')}!` : `${t('Fail')}!`}</h2>
                                    {
                                        session ? (<>
                                            <Link className="btn btn-dark" to='#' onClick={() => { history.push(`/`) }}>
                                            {t('Back to home page')}
                                            </Link>
                                        </>) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {
                        queryUrl && queryUrl.vnp_ResponseCode &&
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                    <div className="mb-7 font-size-h1">{parseInt(queryUrl.vnp_ResponseCode) === 0 ? '❤️' : '😞'}</div>
                                    <h2 className="mb-5">{t('Order ')} {parseInt(queryUrl.vnp_ResponseCode) === 0 ? `${t('Success')}!` : `${t('Fail')}!`}</h2>
                                    <Link className="btn btn-dark" to='#' onClick={() => { history.push(`/`) }}>
                                        {t('Back to home page')}
                                    </Link>
                                    {/* {
                                        session ? (<>
                                            <Link className="btn btn-dark" to='#' onClick={() => { history.push(`/`) }}>
                                                {t('Back to home page')}
                                            </Link>
                                        </>) : ''
                                    } */}
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
