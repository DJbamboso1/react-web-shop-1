import { Order } from '@types'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { currency } from 'utils'
import { orderService } from '../../../services/orderService'

type FilterQuery = {
  // page: string,
  SessionId?: string
  Status?: string
}

const AccountOrders: React.FC = () => {
  let slug: any
  slug = useParams()
  let [order, setOrder] = useState<Order>()
  useEffect(() => {
    (async () => {
      let obj: FilterQuery = {
        SessionId: slug.slug
      }
      let ord = await orderService.getAllOrder(obj)
      setOrder(ord)
    })()
  }, [])
  return (
    <div>

      {/* Order */}
      {
        order?.data && order.data.map(ord => {
          return (
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
                          {ord.id}
                        </p>
                      </div>
                      <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Distributor:</h6>
                        {/* Text */}
                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                          <time dateTime="2019-09-25">
                            {ord.distributorId}
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
                          {currency(ord.orderCost)}
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
          )
        })
      }

      {/* Pagination */}
      <nav className="d-flex justify-content-center justify-content-md-end mt-10">
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
      </nav>
    </div>
  )
}

export default AccountOrders
