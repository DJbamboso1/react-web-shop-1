import { Order } from '@types'
import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { currency } from 'utils'
import { orderService } from '../../../services/orderService'

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
  let { slug } = useParams<{ slug: string }>()
  let [state, setState] = useState<StateProps>({
    loading: true,
    orders: []
  })
  let [order, setOrder] = useState<Order>()
  let [status, setStatus] = useState(-2)

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
      console.log(status)
      console.log(ord)
      setState({
        loading: false,
        orders: ord.data
      })
    })()
  }, [status])


  if (state.loading) {
    return <LoadingPage />
  }
  return (
    <div>
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
                        <div className='col-5'></div>
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
