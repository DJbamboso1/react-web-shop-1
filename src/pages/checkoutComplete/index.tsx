import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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
    
    let queryUrl = convertQueryURLToObject<FilterQuery>()
    console.log(queryUrl)
    let slug = useParams()
    

    return (
        <section className="py-12">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                        {/* Icon */}
                        <div className="mb-7 font-size-h1">❤️</div>
                        {/* Heading */}
                        <h2 className="mb-5">Your Order is Completed!</h2>
                        {/* Text */}
                        <p className="mb-7 text-gray-500">
                            Your order <span className="text-body text-decoration-underline">{slug ? slug : queryUrl.orderId}</span> has been completed. Your order
                            details
                            are shown for your personal accont.
                        </p>
                        {/* Button */}
                        <a className="btn btn-dark" href="#!">
                            View My Orders
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutCompleteComponent
