import { Order, OrderDetail, Product01 } from '@types'
import { Breadcrumbs } from 'components/Breadcrumbs'
import LoadingPage from 'components/LoadingPage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { changeQueryURL, convertQueryURLToObject, currency } from 'utils'
import { orderService } from '../../../services/orderService'
import { addToCart, cartRemoveAll } from 'store/actions/cartAction'
import { useCart } from 'store/selector'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { StateStore } from 'store'
import { Paginate } from 'components/Paginate'
import { productService } from 'services/productService'
import { useTranslate } from 'core'

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
  let { t } = useTranslate()
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

  const [open1, setOpen1] = React.useState(false);
  let [orderId, setOrderId] = useState('')
  // let [orderDetail, setOrderDetail] = useState<OrderDetail['data']>()
  // let [productPro] = useState<Array<any>>([])
  let [index, setIndex] = useState(0)
  useEffect(() => {
    (async () => {

      queryUrl.RetailerId = user?.actorId
      queryUrl.PageSize = '3'
      queryUrl.Status = status
      console.log('QUERYURL: ', queryUrl)

      // if (queryUrl.Status.length > 0) {
      //   changeQueryURL({...queryUrl, PageNumber: "0"})
      //   queryUrl.PageNumber = ""
      // }
      console.log('QUERYURL: ', queryUrl)
      let ord = await orderService.getAllOrder(queryUrl)
      console.log('ORDER PLS', ord)
      for (let i in ord.data) {
        let productPro = []
        let ordDetail = await orderService.getOrderDetail({ OrderId: ord.data[i].id })
        if (ordDetail) {
          for (let e in ordDetail.data) {
            // dispatch(addToCart(ordDetail.data[i].product))
            const detaileData = ordDetail.data[e].product.image
            // console.log("detaileData: ", detaileData)
            // ord.data[i].listImg.push(detaileData)
            productPro.push(detaileData)
          }
          ord.data[i].listImg = productPro
        }

      }
      setOrder(ord)
      setState({
        loading: false,
        orders: ord.data
      })
      let i = (parseInt(queryUrl.PageNumber || '1') - 1) * parseInt(queryUrl.PageSize || '3') + 1
      setIndex(i)
      console.log('ORDER STATE PLS', state.orders)
      console.log("Order: ", order)
    })()
  }, [queryUrl.PageNumber, status, queryUrl.Status])

  if (state.loading) {
    return <LoadingPage />
  }

  const handleClickOpen = (ev: any, id: string) => {
    ev.preventDefault()
    setOrderId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const checkPrice = async (ev: any, id: string) => {
  //   console.log("ID: ", id)
  //   let obj = {
  //     OrderId: id
  //   }
  //   let ordDetail = await orderService.getOrderDetail(obj)
  //   if (ordDetail) {
  //     for(let i in ordDetail.data) {
  //       let product = await productService.getProductById(ordDetail.data[i].product.id)
  //       if (product.data.listPrice) {

  //       }
  //     }
  //   }

  // }

  const reOrderHandle = async (ev: any, id: string) => {
    // ev.preventDefault()
    console.log('F**K ID: ', {OrderId: id})
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
          distrubutorId: detaileData.distributorId,
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
        console.log('F**K product: ', product)
        if (product.status === 1) {
          dispatch(addToCart(product))
        } else {
          
        }
        
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

  console.log('ORDER STATE PLS', state.orders)
  // console.log('LIST IMG: ', state.orders)
  // console.log('PRODUCT PRO: ', productPro)

  return (
    <div>
      <Breadcrumbs list={[
        {
          title: `${t('Home')}`,
          link: '/'
        },
        {
          title: `${t('Orders')}`,
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
          <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }} onChange={(ev) => { setStatus(ev.currentTarget.value);  }} >
            <option value="">{t('Status')}</option>
            {/* <option value="-3">Có hàng bị trả</option> */}
            <option value="-2">{t('Delivery')}</option>
            <option value="-1">{t('Billing')}</option>
            {/* <option value="0">{t('Cancel')}</option> */}
            <option value="1">{t('Charged')}</option>
            <option value="2">{t('Not yet charged')}</option>
            <option value="3">{t('Was delivered')}</option>
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
                          <h6 className="heading-xxxs text-muted">{t('No:')}</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            {index++}
                          </p>
                        </div>

                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">{t('Distributor')}:</h6>
                          {/* Text */}
                          <p className="mb-lg-0 font-size-sm font-weight-bold">
                            <time dateTime="2019-09-25">
                              {ord.distributor.user.displayName}
                            </time>
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">{t('Status')}:</h6>
                          {/* Text */}
                          <p className="mb-0 font-size-sm font-weight-bold" style={{
                            color: `${ord.status === -3 ? 'red' :
                              (ord.status === -2 || ord.status === 0 ? 'red' :
                                ord.status === -1 || ord.status === 2 ? 'orange' :
                                  'green')}`
                          }}>
                            {ord.status === -3 ? 'Có hàng bị trả' :
                              (ord.status === -2 ? t('Delivery') :
                                ord.status === -1 ? t('Billing') : (
                                  ord.status === 0 ? t('Cancel') :
                                    (ord.status === 1 ? t('Charged') :
                                      (ord.status === 2 ? t('Not yet charged') :
                                        (ord.status === 3 && t('Was delivered'))))))}
                          </p>
                        </div>
                        <div className="col-6 col-lg-3">
                          {/* Heading */}
                          <h6 className="heading-xxxs text-muted">{t('Price')}:</h6>
                          {/* Text */}
                          <p className="mb-0 font-size-sm" style={{fontWeight: 'bold', color: 'unset'}}>
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
                        {
                          ord.listImg.map(i => {
                            return (
                              <div className="col-3">
                                <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `url(${i})` }} />
                              </div>
                            )
                          })
                        }
                      </div> */}
                      <div className="form-row mb-4 mb-lg-0">

                            {
                                ord.listImg.slice(0, 3).map((e, i) => <div key={i} className="col-3">
                                    <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `url(${e})` }} />
                                </div>)
                            }
                            {
                                ord.listImg.length === 4 && (
                                    <div className="col-3">
                                        <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `url(${ord.listImg[3]})` }} />
                                    </div>
                                )
                            }
                            {
                                ord.listImg.length >= 5 && (
                                    <div className="col-3">
                                        <div className="embed-responsive embed-responsive-1by1 bg-light">
                                            <Link className="embed-responsive-item embed-responsive-item-text text-reset" to={`/account/orderDetail/${ord.id}`}>
                                                <div className="font-size-xxs font-weight-bold">
                                                    +{ord.listImg.length - 3} <br /> {t('more')}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-row  mb-4 mb-lg-0">
                        <div className='col-5'>
                          {
                            ord.status === 3 && (<>
                              <Link className="btn btn-sm btn-block btn-outline-dark" style={{ minWidth: '120px' }} to='' onClick={(ev) => {
                                handleClickOpen(ev, ord.id);
                                // checkPrice(ev, ord.id)
                              }
                              } >
                                {t('Re-order')}
                              </Link>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {t('Re-order')}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    {t('Would you like to re-order this ?')} <br /> {t('Your current shopping cart will be cleared to re-order')}
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} >{t('No')}</Button>
                                  <Button onClick={(ev) => { reOrderHandle(ev, orderId) }} autoFocus>
                                    {t('Yes')}
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </>)
                          }
                        </div>
                        <div className="col-7">
                          {/* Button */}
                          <Link className="btn btn-sm btn-block btn-outline-dark" to={`/account/orderDetail/${ord.id}`}>
                            {t('Order detail')}
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
        }) : <p style={{ color: 'red' }}>{t('History is empty, do you want to purchase?')} <Link to='/'>{t('Click here')}</Link></p>
      }
      {
        order && <Paginate currentPage={order.pageNumber} totalPage={pageNumber.length} />
      }
    </div>
  )
}

export default AccountOrders
