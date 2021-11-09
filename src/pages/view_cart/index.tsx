import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCart, useTotal, getTaxPrice, getSubtotal } from '../../store/selector'
import { ProductItem } from '../../components'
import { currency } from '../../utils/currency'
import { Redirect } from 'react-router-dom'
import { Breadcrumbs } from 'components/Breadcrumbs'

const ViewCart: React.FC = () => {

    let { list } = useCart()
    let total = useTotal()
    // let taxPrice = useSelector(getTaxPrice)
    const subTotal = useSelector(getSubtotal)

    if (list.length === 0) {
        return <Redirect to="/" />
    }

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Shopping Cart</h3>
                    </div>
                    <Breadcrumbs list={[
                        {
                            title: 'Home',
                            link: '/product'
                        },
                        {
                            title: 'View cart',
                            link: '/view-cart'
                        }
                    ]} />

                </div>

                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-x mb-6">
                            {
                                list.map(e => <ProductItem key={e.product.id} product={e.product} num={e.num} />)
                            }
                        </ul>
                        {/* Footer */}
                        {/* <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                            <div className="col-12 col-md-7">
                                
                                <form className="mb-7 mb-md-0">
                                    <label className="font-size-sm font-weight-bold" htmlFor="cartCouponCode">
                                        Coupon code:
                                    </label>
                                    <div className="row form-row">
                                        <div className="col">
                                            
                                            <input className="form-control form-control-sm" id="cartCouponCode" type="text" placeholder="Enter coupon code*" />
                                        </div>
                                        <div className="col-auto">
                                            
                                            <button className="btn btn-sm btn-dark" type="submit">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-md-auto">
                                
                                <button className="btn btn-sm btn-outline-dark">Update Cart</button>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Total */}
                        <div className="card mb-7 bg-light">
                            <div className="card-body">
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    {/* <li className="list-group-item d-flex">
                                        <span>Subtotal</span> <span className="ml-auto font-size-sm">{currency(subTotal)}</span>
                                    </li> */}
                                    {/* <li className="list-group-item d-flex">
                                        <span>Tax</span> <span className="ml-auto font-size-sm">{currency(taxPrice)}</span>
                                    </li> */}
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>Total</span> <span className="ml-auto font-size-sm">{currency(total)}</span>
                                    </li>
                                    {/* <li className="list-group-item font-size-sm text-center text-gray-500">
                                        Shipping cost calculated at Checkout *
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        {/* Button */}
                        <Link className="btn btn-block btn-dark mb-2" to="/checkout">Proceed to Checkout</Link>
                        {/* Link */}
                        <a className="btn btn-link btn-sm px-0 text-body" href="/">
                            <i className="fe fe-arrow-left mr-2" /> Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewCart