import { Order, Product01 } from '@types'
import { Breadcrumbs } from 'components/Breadcrumbs'
import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { currency } from 'utils'
import { orderService } from '../../../services/orderService'
import { addToCart, cartRemoveAll } from 'store/actions/cartAction'
import { useCart } from 'store/selector'

type FilterQuery = {
  // page: string,
  SessionId?: string
  Status?: number
}

type StateProps = {
  loading: boolean,
  orders: Order['data'],
}

const AccountOrders: React.FC = () => {
  let dispatch = useDispatch()
  let { slug } = useParams<{ slug: string }>()
  let [state, setState] = useState<StateProps>({
    loading: true,
    orders: []
  })
  let [order, setOrder] = useState<Order>()
  let [status, setStatus] = useState(-2)
  const { list } = useCart()

  useEffect(() => {
    (async () => {
      let obj: FilterQuery = {}
      if (status > -2) {
        obj = {
          SessionId: slug,
          Status: status
        }
      } else {
        obj = {
          SessionId: slug,
        }
      }
      let ord = await orderService.getAllOrder(obj)
      // setOrder(ord)
      
      setState({
        loading: false,
        orders: ord.data
      })
    })()
  }, [status])

  if (state.loading) {
    return <LoadingPage />
  }

  const reOrderHandle = async (ev: any, id: string) => {
    ev.preventDefault()
    dispatch(cartRemoveAll())
    let ordDetail = await orderService.getOrderDetail({ OrderId: id })
    if (ordDetail) {
      for (let i in ordDetail.data) {
        // dispatch(addToCart(ordDetail.data[i].product))
        const detaileData = ordDetail.data[i].product
        let product = {
          id: detaileData.id,
          distributor: detaileData.distributor,
          name: detaileData.name,
          image: detaileData.image,
          description: detaileData.description,
          minQuantity: detaileData.minQuantity,
          status: detaileData.status,
          parentCategoryId: detaileData.parentCategoryId,
          parentCategoryName: detaileData.parentCategoryName,
          subCategory: detaileData.subCategory,
          listPrice: detaileData.listPrice,
          quantity: ordDetail.data[i].quantity
        }
        
        dispatch(addToCart(product))
        
        
        // console.log(p)
        // if (p) p.num = ordDetail.data[i].quantity
      }
    }
  }

  return (
    <div>
      <Breadcrumbs list={[
        {
          title: 'Home',
          link: '/'
        },
        {
          title: 'Session',
          link: '/account/session'
        },
        {
          title: 'Orders',
          link: `/account/orders/${slug}`
        },
      ]} />
      {/* Order */}
      <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0px' }}>
        <form >
          {/* Select */}
          Trạng thái: <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }} onChange={(ev) => { setStatus(parseInt(ev.currentTarget.value)) }} >
            <option value="-1">Đang thành tiền</option>
            <option value="0">Đã hủy</option>
            <option value="1">Đã thành tiền</option>
            <option value="2">Chưa tính tiền</option>
          </select>
        </form>
      </div>
      {
        state.orders ? state.orders.map((ord, i) => {
          return (
            <>
              <div className="card card-lg mb-5 border">
                <div className="card-body pb-0">
                  {/* Info */}
                  <div className="card card-sm">
                    <div className="card-body bg-light">
                      <div className="row">
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Order No:</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            {i + 1}
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Distributor:</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            <time dateTime="2019-09-25">
                              {ord.distributor.user.displayName}
                            </time>
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Status:</h6>
                          {/* Text */}
                          <p className="mb-0 font-size-sm font-weight-bold">
                            {ord.status === -1 ? 'Đang thành tiền' : (ord.status === 0 ? 'Hủy' : (ord.status === 1 ? 'Đã thành tiền' : (ord.status === 2 ? 'Chưa thành tiền' : '')))}
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                          {/* Text */}
                          <p className="mb-0 font-size-sm font-weight-bold">
                            {ord.orderCost && currency(ord.orderCost)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row align-items-center">
                    <div className="col-12 col-lg-6">
                      {/* <div className="form-row mb-4 mb-lg-0">
                <div className="col-3">
        
                  <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: 'url(/img/products/product-11.jpg)' }} />
                </div>
              </div> */}
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-row  mb-4 mb-lg-0">
                        <div className='col-5'>
                          <Link className="btn btn-sm btn-block btn-outline-dark" to='' onClick={(ev) => { reOrderHandle(ev, ord.id) }} >
                            Re-Order
                          </Link>
                        </div>
                        <div className="col-7">
                          {/* Button */}
                          <Link className="btn btn-sm btn-block btn-outline-dark" to={`/account/orderDetail/${ord.id}`}>
                            Order Details
                          </Link>
                        </div>
                        {/* <div className="col-6">
                  
                  <a className="btn btn-sm btn-block btn-outline-dark" href="#!">
                    Track order
                  </a>
                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : <p style={{ color: 'red' }}>Session is empty, want to buy some product ? <Link to='/'>Click here</Link></p>
      }

      {/* Pagination */}
      {/* <nav className="d-flex justify-content-center justify-content-md-end mt-10">
        <ul className="pagination pagination-sm text-gray-400">
          <li className="page-item">
            <a className="page-link page-link-arrow" href="#">
              <i className="fa fa-caret-left" />
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">4</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">5</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">6</a>
          </li>
          <li className="page-item">
            <a className="page-link page-link-arrow" href="#">
              <i className="fa fa-caret-right" />
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  )
}

export default AccountOrders
