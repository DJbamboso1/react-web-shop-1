import { Order1, OrderDetail } from '@types'
import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { orderService } from 'services/orderService'
import { getSubtotal, useCartNumber, useTotal } from 'store/selector'
import { currency } from 'utils'

type FilterQuery = {
    OrderId?: string,
    OrderPrice?: string,
    Quantity?: string,
    PageNumber?: string,
    PageSize?: string
}

type StateProps = {
    loading: boolean,
    order?: Order1['data'],
    orderDetail: OrderDetail['data']
  }

const AccountOrderDetail: React.FC = () => {
    let { slug } = useParams<{ slug: string }>()
    let [orderDetail, setOrderDetail] = useState<OrderDetail>()
    let [state, setState] = useState<StateProps>({
        loading: true,
        orderDetail: []
    })
    let [order, setOrder] = useState<Order1>()

    let Subtotal = useTotal()
    useEffect(() => {
        (async () => {
            let obj: FilterQuery = {
                OrderId: slug
            }
            let ordDetail = await orderService.getOrderDetail(obj)
            // setOrderDetail(ordDetail)
            let ord = await orderService.getOrderById(slug)
            // setOrder(ord)
            setState({
                loading: false,
                order: ord.data,
                orderDetail: ordDetail.data
            })
        })()
    }, [])

    if (state.loading) {
        return <LoadingPage />
      }
    return (
        <div>
            <div className="card card-lg mb-5 border">
                <div className="card-body pb-0">
                    {/* Info */}
                    {
                        state.order &&
                        <div className="card card-sm">
                            <div className="card-body bg-light">
                                <div className="row">
                                    <div className="col-6 col-lg-3">
                                        {/* Heading */}
                                        <h6 className="heading-xxxs text-muted">Order No:</h6>
                                        {/* Text */}
                                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                                            {state.order.id}
                                        </p>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        {/* Heading */}
                                        <h6 className="heading-xxxs text-muted">Distributor:</h6>
                                        {/* Text */}
                                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                                            <time dateTime="2019-09-25">
                                                {state.order.distributor.user.displayName}
                                            </time>
                                        </p>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        {/* Heading */}
                                        <h6 className="heading-xxxs text-muted">Status:</h6>
                                        {/* Text */}
                                        <p className="mb-0 font-size-sm font-weight-bold">
                                            {state.order.status === -1 ? 'Đang thành tiền' : (state.order.status === 0 ? 'Hủy' : (state.order.status === 1 ? 'Đã thành tiền' : (state.order.status === 2 ? 'Chưa thành tiền' : '')))}
                                        </p>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        {/* Heading */}
                                        <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                                        {/* Text */}
                                        <p className="mb-0 font-size-sm font-weight-bold">
                                            {currency(state.order.orderCost)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="card-footer">
                    {/* Heading */}
                    <h6 className="mb-7">Order Items ({state.orderDetail.length})</h6>
                    {/* Divider */}
                    <hr className="my-5" />
                    {/* List group */}
                    <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
                        {state.orderDetail && state.orderDetail.map(ordDetail => {
                            return (
                                <li className="list-group-item">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-md-3 col-xl-2">
                                            {/* Image */}
                                            <Link to={`/${ordDetail.product.id}`}>
                                                <img src={ordDetail.product.image} alt="..." className="img-fluid" />
                                            </Link>
                                        </div>
                                        <div className="col">
                                            {/* Title */}
                                            <p className="mb-4 font-size-sm font-weight-bold">
                                                <Link className="text-body" to={`/${ordDetail.product.id}`}>{ordDetail.product.id}</Link> <br />
                                                <span className="text-muted">{currency(ordDetail.orderPrice)}</span>
                                            </p>
                                            {/* Text */}
                                            <div className="font-size-sm text-muted">
                                                Quantity: {ordDetail.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
            {/* Total */}
            {
                order?.data && <div className="card card-lg mb-5 border">
                    <div className="card-body">
                        {/* Heading */}
                        <h6 className="mb-7">Order Total</h6>
                        {/* List group */}
                        <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                            {/* <li className="list-group-item d-flex">
                            <span>Subtotal</span>
                            <span className="ml-auto">$128.00</span>
                        </li> */}
                            {/* <li className="list-group-item d-flex">
                            <span>Tax</span>
                            <span className="ml-auto">$0.00</span>
                        </li> */}
                            {/* <li className="list-group-item d-flex">
                            <span>Shipping</span>
                            <span className="ml-auto">$8.00</span>
                        </li> */}
                            <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                <span>Total</span>
                                <span className="ml-auto">{currency(order.data.orderCost)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            {/* Details */}
            {/* <div className="card card-lg border">
                <div className="card-body">
                    
                    <h6 className="mb-7">Billing &amp; Shipping Details</h6>
                   
                    <div className="row">
                        <div className="col-12 col-md-4">
                           
                            <p className="mb-4 font-weight-bold">
                                Billing Address:
                            </p>
                            <p className="mb-7 mb-md-0 text-gray-500">
                                Daniel Robinson, <br />
                                3997 Raccoon Run, <br />
                                Kingston, 45644, <br />
                                United States, <br />
                                6146389574
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                           
                            <p className="mb-4 font-weight-bold">
                                Shipping Address:
                            </p>
                            <p className="mb-7 mb-md-0 text-gray-500">
                                Daniel Robinson, <br />
                                3997 Raccoon Run, <br />
                                Kingston, 45644, <br />
                                United States, <br />
                                6146389574
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            
                            <p className="mb-4 font-weight-bold">
                                Shipping Method:
                            </p>
                            <p className="mb-7 text-gray-500">
                                Standart Shipping <br />
                                (5 - 7 days)
                            </p>
                            
                            <p className="mb-4 font-weight-bold">
                                Payment Method:
                            </p>
                            <p className="mb-0 text-gray-500">
                                Debit Mastercard
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default AccountOrderDetail
