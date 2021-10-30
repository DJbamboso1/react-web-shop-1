import { Checkin, Checkout, Payment } from "@types"
import { ProductItem } from "components"
import { useForm } from "core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getSubtotal, getTaxPrice, useCart, useCartNumber, useTotal } from "store/selector"
import { currency } from "utils"
import { TextField } from "./components"
import { paymentService } from '../../services/paymentService'
import { StateStore } from "store"
import { stringify } from "querystring"
import { formGroupClasses } from "@mui/material"
import { cartCheckout } from "store/actions/cartAction"

type Form = {
    email: string,
    address: string,
    phoneNumber: string,
    displayName: string
}

let url = process.env.LINK_URL || ''

const CheckoutComponent: React.FC = () => {

    let { user } = useSelector((store: StateStore) => store.auth)
    const { list } = useCart()

    const total = useTotal()

    const cartNumber = useCartNumber()
    // const [shippingPrice, setShippingPrice] = useState(35000)

    const { error, form, handleSubmit, register } = useForm<Form>(user?.data)

    const [paymentMethod, setPaymentMethod] = useState<Payment>()

    const [payment, setPayment] = useState('')

    const [result, setResult] = useState<Checkout>()

    const [actor, setActor] = useState('')
    useEffect(() => {
        (async () => {
            let payment = await paymentService.getAllPayments()
            // console.log('PAYMENT: ', payment.data)
            setPaymentMethod(payment)
            setPayment(payment.data[0].id)
        })()
        if (user && user.data) {
            setActor(user.data.actorId)
        }
    }, [])

    // console.log('PAYMENT METHOD: ', paymentMethod)

    if (list.length === 0) {
        return <Redirect to="/product" />
    }

    const formSubmit = (form: Form) => {
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
            redirectUrl: url + '/product'
        };
        
        (async () => {
            let obj = await paymentService.checkout(checkoutObj)    
            setResult(obj)
        })()
    }
    
    if (result && result.data.paymentResponse !== null) {
        window.location.href = result.data.paymentResponse.payUrl
    }

    const changePaymentMethod = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.currentTarget.value
        console.log(value)
        setPayment(value)
    }

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-4">Checkout</h3>
                        {/* Subheading */}
                        <p className="mb-10">
                            Already have an account? <a className="font-weight-bold text-reset" href="#!">Click here to login</a>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="row">

                        <div className="col-12 col-md-7">
                            {/* Form */}

                            {/* Heading */}
                            <h6 className="mb-7" style={{ fontWeight: 'bold' }}>Hóa đơn chi tiết</h6>
                            {/* Billing details */}
                            <div className="row mb-9">
                                {/* <TextField className="col-md-6" {...register('firstName', { required: true })} error={error.firstName} required label="First Name" placeholder="First Name" />
                                <TextField className="col-md-6" {...register('lastName', { required: true })} error={error.lastName} required label="Last Name" placeholder="Last Name" /> */}
                                <TextField  {...register('displayName', { required: true })} error={error.displayName} required label="Full Name" placeholder="Last Name" />
                                <TextField {...register('email', { required: true })} error={error.email} required label="Email" placeholder="Email" />
                                <TextField {...register('phoneNumber', { required: true })} error={error.phoneNumber} required label="Phone" placeholder="Phone" />
                                <TextField {...register('address', { required: true })} error={error.address} required label="Address" placeholder="Address" />
                            </div>
                            <h6 className="mb-7">Phương thức thanh toán</h6>
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
                                                                    {pm.description}
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
                            <h6 className="mb-7">Order Items ({cartNumber})</h6>
                            {/* Divider */}
                            <hr className="my-7" />
                            {/* List group */}
                            <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x mb-7">
                                {
                                    list.map(e => {

                                        return (
                                            <ProductItem key={e.product.id} product={e.product} num={e.num} />
                                        )
                                    })
                                }
                            </ul>
                            {/* Card */}
                            <div className="card mb-9 bg-light">
                                <div className="card-body">
                                    <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                        {/* <li className="list-group-item d-flex">
                                            <span>Subtotal</span> <span className="ml-auto font-size-sm">{currency(subTotal)}</span>
                                        </li> */}
                                        {/* <li className="list-group-item d-flex">
                                            <span>id: </span> <span className="ml-auto font-size-sm">{payment}</span>
                                        </li> */}
                                        {/* <li className="list-group-item d-flex">
                                            <span>Shipping</span> <span className="ml-auto font-size-sm">{currency(shippingPrice)}</span>
                                        </li> */}
                                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                            <span>Total</span> <span className="ml-auto">{currency(total)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Disclaimer */}
                            <p className="mb-7 font-size-xs text-gray-500">
                                Your personal data will be used to process your order, support
                                your experience throughout this website, and for other purposes
                                described in our privacy policy.
                            </p>
                            {/* Button */}
                            <button type="submit" className="btn btn-block btn-dark">
                                Place Order
                            </button>
                        </div>
                    </div>


                </form>
            </div >
        </section >
    )
}

export default CheckoutComponent