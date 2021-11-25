import { Order, Product01 } from '@types'
import { Breadcrumbs } from 'components/Breadcrumbs'
import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { convertQueryURLToObject, currency } from 'utils'
import { orderService } from '../../../services/orderService'
import { addToCart, cartRemoveAll } from 'store/actions/cartAction'
import { useCart } from 'store/selector'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { StateStore } from 'store'
import { Paginate } from 'components/Paginate'

type FilterQuery = {
  // page: string,
  RetailerId?: string
  Status?: string,
  PageSize?: string,
  PageNumber?: string,
}

type StateProps = {
  loading: boolean,
  orders: Order['data'],
}

const AccountOrders: React.FC = () => {
  let queryUrl = convertQueryURLToObject<FilterQuery>()
  let dispatch = useDispatch()
  let { user } = useSelector((store: StateStore) => store.auth)
  let [state, setState] = useState<StateProps>({
    loading: true,
    orders: []
  })
  let [order, setOrder] = useState<Order>()
  let [status, setStatus] = useState('')
  // const { list } = useCart()
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    (async () => {

      queryUrl.RetailerId = user?.actorId
      queryUrl.PageSize = '3'
      queryUrl.Status = status
      console.log('cacacacacacacac: ', queryUrl)
      let ord = await orderService.getAllOrder(queryUrl)
      console.log('ORDER PLS', ord)
      setOrder(ord)
      setState({
        loading: false,
        orders: ord.data
      })
      console.log('ORDER STATE PLS', state.orders)
    })()
  }, [queryUrl.PageNumber, status])

  if (state.loading) {
    return <LoadingPage />
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const reOrderHandle = async (ev: any, id: string) => {
    ev.preventDefault()
    dispatch(cartRemoveAll())
    handleClose()
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

  const total = order?.total as number
  const pageSize = order?.pageSize as number
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
    pageNumber.push(i)
  }

  return (
    <div>
      <Breadcrumbs list={[
        {
          title: 'Trang chủ',
          link: '/'
        },
        {
          title: 'Đơn hàng',
          link: '/account/orders'
        },
        // {
        //   title: 'Đơn',
        //   link: `/account/orders/${slug}`
        // },
      ]} />
      {/* Order */}
      <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0px' }}>
        <form >
          {/* Select */}
          Trạng thái: <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }} onChange={(ev) => { setStatus(ev.currentTarget.value) }} >
            <option value="-3">Có hàng bị trả</option>
            <option value="-2">Chưa được giao</option>
            <option value="-1">Đang thành tiền</option>
            <option value="0">Đã hủy</option>
            <option value="1">Đã thành tiền</option>
            <option value="2">Chưa tính tiền</option>
            <option value="3">Đã được giao</option>

          </select>
        </form>
      </div>
      {
        state.orders.length > 0 ? state.orders.map((ord, i) => {
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
                          <h6 className="heading-xxxs text-muted">Số thứ tự:</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            {i + 1}
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Nhà phân phối:</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            <time dateTime="2019-09-25">
                              {ord.distributor.user.displayName}
                            </time>
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Trạng thái:</h6>
                          {/* Text */}
                          <p className="mb-0 font-size-sm font-weight-bold" style={{
                            color: `${ord.status === -3 ? 'red' :
                              (ord.status === -2 || ord.status === 0 ? 'red' :
                                ord.status === -1 || ord.status === 2 ? 'orange' :
                                  'green')}`
                          }}>
                            {ord.status === -3 ? 'Có hàng bị trả' :
                              (ord.status === -2 ? 'Chưa được giao' :
                                ord.status === -1 ? 'Đang thành tiền' : (
                                  ord.status === 0 ? 'Hủy' :
                                    (ord.status === 1 ? 'Đã thành tiền' :
                                      (ord.status === 2 ? 'Chưa thành tiền' :
                                        (ord.status === 3 && 'Đã được giao')))))}
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">Giá:</h6>
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
                          {
                            ord.status === 1 && (<>
                              <Link className="btn btn-sm btn-block btn-outline-dark" style={{ minWidth: '120px' }} to='#' onClick={handleClickOpen}  >
                                Đặt lại đơn
                              </Link>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  Đặt lại đơn
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Bạn có muốn đặt lại đơn này ? <br /> Giỏ hàng hiện tại của bạn sẽ bị xóa để đặt lại đơn
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} >Không</Button>
                                  <Button onClick={(ev) => { reOrderHandle(ev, ord.id) }} autoFocus>
                                    Có
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </>)
                          }
                        </div>
                        <div className="col-7">
                          {/* Button */}
                          <Link className="btn btn-sm btn-block btn-outline-dark" to={`/account/orderDetail/${ord.id}`}>
                            Chi tiết đơn
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
        }) : <p style={{ color: 'red' }}>Lịch sử rỗng, bạn có muốn mua hàng ? <Link to='/'>Ấn vào đây</Link></p>
      }
      {
        order && <Paginate currentPage={order.pageNumber} totalPage={pageNumber.length} />
      }
    </div>
  )
}

export default AccountOrders
