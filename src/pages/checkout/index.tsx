import { Checkin, Checkout, Membership, Payment, User } from "@types"
import { CartItem, ProductItem } from "components"
import { history, useForm, useTranslate } from "core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { calculateTotal, useCart, useCartNumber, useTotal } from "store/selector"
import { currency } from "utils"
import { TextField } from "./components"
import { paymentService } from '../../services/paymentService'
import { StateStore } from "store"
import { stringify } from "querystring"
import { formGroupClasses, Modal, Typography } from "@mui/material"
import { cartCheckout, cartRemove, cartRemoveAll } from "store/actions/cartAction"
import authService from "services/authService"
import { Breadcrumbs } from "components/Breadcrumbs"
import { Box } from "@mui/system"
import LoadingPage from "components/LoadingPage"
import { memberService } from "services/memberService"
import distributorService from "services/distributorService"
// import { calculateTotal, getPricePerPro } from 'store/selector/cartSelector'

type Form = User['data']

let url = process.env.REACT_APP_LINK_URL || ''

const CheckoutComponent: React.FC = () => {
    // let {t} = useTranslate()
    let dispatch = useDispatch()
    let { user } = useSelector((store: StateStore) => store.auth)
    const { list } = useCart()
    let total = useTotal()
    const cartNumber = useCartNumber()
    // const [shippingPrice, setShippingPrice] = useState(35000)
    const { error, form, handleSubmit, register, setForm } = useForm<Form>(user)
    const [paymentMethod, setPaymentMethod] = useState<Payment>()
    const [payment, setPayment] = useState('')
    const [result, setResult] = useState<Checkout>()
    const [actor, setActor] = useState('')
    let [isActive, setIsActive] = useState(true)
    let [loading, setLoading] = useState(false)
    let [open, setOpen] = useState(false);
    let list1: Membership[] = [];
    let [complexList, setComplexList] = useState<Membership[]>()
    let { t } = useTranslate()

    useEffect(() => {
        (async () => {
            if (user) {
                setLoading(true)
                let payment = await paymentService.getAllPayments()
                // console.log('PAYMENT: ', payment.data)
                setPaymentMethod(payment)
                setPayment(payment.data[0].id)
                let inf = await authService.getInfo(user.id)
                // setInfo(inf)
                setForm(inf.data)
                setActor(user.actorId)
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let retailer = await authService.getRetailerById(user?.actorId || '')
            if (retailer && retailer.data) {
                setIsActive(retailer.data.isActive)
            }
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (user) {
                console.log('A')
                for (let i in list) {
                    let membership = await memberService.getMembership(user.actorId, list[i].product.distrubutorId || '')
                    console.log('B: ', membership)
                    if (membership.data) {
                        let dis = await distributorService.getDistributorById(membership.data.distributorId)
                        console.log('C: ', dis)
                        if (dis) {
                            let user = await authService.getInfo(dis.data.userId)
                            console.log('D: ', user)
                            if (user) {
                                console.log('E')
                                membership.data.distributor = user.data
                            }
                        }
                        membership.data.product = list[i].product
                        membership.data.num = list[i].num
                    }
                    list1.push(membership)
                }
                // console.log("WATCH THIS F LIST: ", list1)
                setComplexList(list1)
            }
        })()
    }, [list])

    // console.log('LIST: ', list)



    const formSubmit = async (form: Form) => {
        setLoading(true)
        let cart = []
        for (let i = 0; i < list.length; i++) {
            cart.push({ id: list[i].id, quantity: list[i].num })
        };
        let checkoutObj: Checkin
        checkoutObj = {
            cart: cart,
            paymentMethodId: payment,
            retailerId: actor,
            shippingAddress: form.address,
            redirectUrl: `${url + '/order-complete'}`
        };
        console.log('Checkout Obj: ', checkoutObj)
        try {
            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
            let obj = await paymentService.checkout(checkoutObj)
            console.log("Checkout result: ", obj)
            if (obj) {
                dispatch(cartRemoveAll())
                localStorage.removeItem('cart')
                setLoading(false)
                if (obj.data.vnPayPaymentUrl) {
                    window.location.href = obj.data.vnPayPaymentUrl
                } else
                    if (obj.data.paymentResponse !== null) {
                        window.location.href = obj.data.paymentResponse.payUrl
                    } else {
                        history.push(`/order-complete/${obj.data.sessionId}`)
                    }
            }
        } catch (err) {
            console.log('ERROR GOES HERE    ')
            setOpen(true)

        }

    }

    if (open === true) {
        return (
            <Modal
                open={open}
                onClose={() => { setOpen(false); setLoading(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {t('Thanh toán thất bại')}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t('Please double check your order')}<br />
                        {t('Order should be more than 1,000 VND')}
                    </Typography>
                </Box>
            </Modal>
        )
    }

    // } else {
    //     return <Redirect to='/product' />
    // }

    const changePaymentMethod = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.currentTarget.value
        // console.log(value)
        setPayment(value)
    }


    if (list.length === 0) {
        return <Redirect to='/' />
    }

    if (isActive === false) {
        return <Redirect to='/' />
    }

    console.log('List: ', list)
    return (
        <section className="pt-7 pb-12">
            {
                !loading ? <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            {/* Heading */}
                            <h3 className="mb-4">{t('Thanh toán')}</h3>
                            {/* Subheading */}
                            {/* <p className="mb-10">
                            Already have an account? <a className="font-weight-bold text-reset" href="#!">Click here to login</a>
                        </p> */}
                        </div>
                        <Breadcrumbs list={[
                            {
                                title: `${t('Home')}`,
                                link: '/'
                            },
                            {
                                title: `${t('View cart detail')}`,
                                link: '/view-cart'
                            },
                            {
                                title: `${t('Payment')}`,
                                link: '/checkout'
                            },
                        ]} />
                    </div>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="row">

                            <div className="col-12 col-md-7">
                                {/* Form */}

                                {/* Heading */}
                                <h6 className="mb-7" style={{ fontWeight: 'bold' }}>{t('Order detail')}</h6>
                                {/* Billing details */}
                                <div className="row">
                                    {/* <TextField className="col-md-6" {...register('firstName', { required: true })} error={error.firstName} required label="First Name" placeholder="First Name" />
                                <TextField className="col-md-6" {...register('lastName', { required: true })} error={error.lastName} required label="Last Name" placeholder="Last Name" /> */}
                                    <TextField {...register('displayName', { required: true })} error={error.displayName} required label="Họ tên" placeholder="Last Name" disable />
                                    <TextField {...register('email', { required: true })} error={error.email} required label="Email" placeholder="Email" disable />
                                    <TextField {...register('phoneNumber', { required: true })} error={error.phoneNumber} required label="Số điện thoại" placeholder="Phone" disable />
                                    <TextField {...register('address', { required: true })} error={error.address} required label="Địa chỉ" placeholder="Address" />
                                </div>
                                <h6 className="">{t('Payment method')}</h6>
                                <div className="table-responsive mb-6">
                                    <table className="table table-bordered table-sm table-hover mb-0">
                                        <tbody>
                                            {
                                                paymentMethod && (paymentMethod.data.map(pm => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="custom-control custom-radio">

                                                                    <input onChange={changePaymentMethod} className="custom-control-input" checked={payment === pm.id}
                                                                        id={pm.id} value={pm.id} name="paymentMethodId" type="radio" />

                                                                    <label className="custom-control-label text-body text-nowrap" htmlFor={pm.id}>
                                                                        {/* {console.log(pm.id)} */}
                                                                        {pm.description === 'Cash on Delivery' ? `${t('Cash on delivery')}` : (pm.description === 'Ví điện tử Momo' ? `${t('Pay with Momo wallet')}` : `${t('Pay with VNPay')}`)}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }))
                                            }



                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className="mb-9">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={(ev) => setIsDifferentAddress(ev.currentTarget.checked)} checked={isDifferentAddress} className="custom-control-input" id="checkoutShippingAddress" type="checkbox" />
                                    <label className="custom-control-label font-size-sm" data-toggle="collapse" data-target="#checkoutShippingAddressCollapse" htmlFor="checkoutShippingAddress">
                                        Ship to a different address?
                                    </label>
                                </div>
                                <div className={`collapse ${isDifferentAddress ? 'show' : ''}`} id="checkoutShippingAddressCollapse">
                                    <div className="row mt-6">
                                        <TextField {...register('address2', { required: true, check: isDifferentAddress })} error={error.address2} required label="Addresss" placeholder="Addresss" />
                                        <TextField {...register('phone2', { required: true, check: isDifferentAddress })} error={error.phone2} required label="Phone" placeholder="Phone" />

                                        <div className="col-12">
                                            <button className="btn btn-sm btn-outline-dark" type="submit">
                                                Save Address
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                {/*<h6 className="mb-7">Payment</h6>
                            <div className="list-group list-group-sm mb-7">
                                <div className="list-group-item">
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" id="checkoutPaymentCard" name="payment" type="radio" data-toggle="collapse" data-action="show" data-target="#checkoutPaymentCardCollapse" />
                                        <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentCard">
                                            Credit Card <img className="ml-2" src="/img/brands/color/cards.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                                <div className="list-group-item collapse py-0" id="checkoutPaymentCardCollapse">
                                    <div className="form-row py-5">
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardNumber">Card Number</label>
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardNumber" type="text" placeholder="Card Number *" required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardName">Name on Card</label>
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardName" type="text" placeholder="Name on Card *" required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentMonth">Month</label>
                                                <select className="custom-select custom-select-sm" id="checkoutPaymentMonth">
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardYear">Year</label>
                                                <select className="custom-select custom-select-sm" id="checkoutPaymentCardYear">
                                                    <option>2017</option>
                                                    <option>2018</option>
                                                    <option>2019</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="input-group input-group-merge">
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardCVV" type="text" placeholder="CVV *" required />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards.">
                                                        <i className="fe fe-help-circle" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" id="checkoutPaymentPaypal" name="payment" type="radio" data-toggle="collapse" data-action="hide" data-target="#checkoutPaymentCardCollapse" />
                                        <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentPaypal">
                                            <img src="/img/brands/color/paypal.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <textarea className="form-control form-control-sm mb-9 mb-md-0 font-size-xs" rows={5} placeholder="Order Notes (optional)" defaultValue={""} /> */}
                            </div>
                            <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                                {/* Heading */}
                                <h6 className="mb-7">Đơn ({list.length})</h6>
                                {/* Divider */}
                                <hr className="my-7" />
                                {/* List group */}
                                <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x mb-7">
                                    {
                                        list.map(e => {

                                            return (
                                                <CartItem key={e.product.id} product={e.product} num={e.num} />
                                            )
                                        })
                                    }
                                </ul>
                                {/* Card */}
                                <div className="card mb-9 bg-light" >
                                    <div className="card-body" >
                                        <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                            {
                                                complexList && complexList.map((i) => {
                                                    if (i.data && i.data.distributor && i.data.product && i.data.num && i.data.discountRate) {
                                                        return (
                                                            <li className="list-group-item d-flex">
                                                                <span style={{ width: '60%' }}>
                                                                    <span style={{ width: '10%' }}>{i.data.product.name}</span><br />
                                                                    <span className='text-muted' style={{ fontSize: '10pt' }}>{t('Distributor')}: {i.data.distributor.displayName}</span>
                                                                </span>
                                                                <span className="ml-auto font-size-sm" style={{ fontWeight: 'bold' }}>
                                                                    {currency(-1 * calculateTotal(i.data.product, i.data.num) * i.data.discountRate / 100)}
                                                                </span>
                                                            </li>
                                                        )
                                                    }

                                                })
                                            }
                                            <li className="list-group-item d-flex">
                                                <span>Subtotal</span> <span className="ml-auto font-size-sm" style={{ fontWeight: 'bold' }}>{currency(total)}</span>
                                            </li>
                                            {/* <li className="list-group-item d-flex">
                                            <span>id: </span> <span className="ml-auto font-size-sm">{payment}</span>
                                        </li> */}
                                            {/* <li className="list-group-item d-flex">
                                            <span>Shipping</span> <span className="ml-auto font-size-sm">{currency(shippingPrice)}</span>
                                        </li> */}
                                            <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                                <span>Tổng:</span> <span className="ml-auto" style={{ fontWeight: 'bold' }}>
                                                    {
                                                        complexList && complexList.map((i) => {
                                                            if (i.data && i.data.distributor && i.data.product && i.data.num && i.data.discountRate) {
                                                                total += (-1 * calculateTotal(i.data.product, i.data.num) * i.data.discountRate / 100)
                                                            }

                                                        })

                                                    }
                                                    {
                                                        currency(total)
                                                    }</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Disclaimer */}
                                {/* <p className="mb-7 font-size-xs text-gray-500">
                                Your personal data will be used to process your order, support
                                your experience throughout this website, and for other purposes
                                described in our privacy policy.
                            </p> */}
                                {/* Button */}
                                <button type="submit" className="btn btn-block btn-dark">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </form>
                </div > : <LoadingPage />
            }
        </section >
    )
}

export default CheckoutComponent