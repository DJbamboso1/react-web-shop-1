import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCart, useTotal, getSubtotal } from '../../store/selector'
import { ProductItem } from '../../components'
import { currency } from '../../utils/currency'
import { Redirect } from 'react-router-dom'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { StateStore } from 'store'
import authService from 'services/authService'
import { Membership } from '@types'
import { memberService } from 'services/memberService'
import distributorService from 'services/distributorService'
import { calculateTotal } from 'store/selector/cartSelector'
import { useTranslate } from 'core'

type State = {
    list: Membership[]
}

const ViewCart: React.FC = () => {
    let { t } = useTranslate()
    let { list } = useCart()
    let total = useTotal()
    // let taxPrice = useSelector(getTaxPrice)
    const subTotal = useSelector(getSubtotal)
    let { user } = useSelector((store: StateStore) => store.auth)
    let list1: Membership[] = []
    let [isActive, setIsActive] = useState(true)
    let [complexList, setComplexList] = useState<Membership[]>()
    let [memberShipRank, setMemberShipRank] = useState<Membership>()
    useEffect(() => {
        (async () => {
            let retailer = await authService.getRetailerById(user?.actorId || '')
            if (retailer && retailer.data) {
                setIsActive(retailer.data.isActive)
            }
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

    if (list.length === 0 || isActive === false) {
        return <Redirect to="/" />
    }

    console.log("WATCH THIS F LIST: ", complexList)

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">{t('Cart')}</h3>
                    </div>
                    <Breadcrumbs list={[
                        {
                            title: `${t('Home')}`,
                            link: '/'
                        },
                        {
                            title: `${t('View cart detail')}`,
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
                            <div className="card-body" >
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    {
                                        complexList && complexList.map((i) => {
                                            if (i.data && i.data.distributor && i.data.product && i.data.num && i.data.discountRate) {
                                                return (
                                                    <li className="list-group-item d-flex">
                                                        <span style={{ width: '60%' }}>
                                                            <span style={{  width: '10%'}}>{i.data.product.name}</span> <span className='text-muted' style={{fontWeight: 'bold'}}>({i.data.discountRate}%)</span><br/>
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
                                        <span>{t('Default price')}:</span> <span className="ml-auto font-size-sm" style={{ fontWeight: 'bold' }}>{currency(total)}</span>
                                    </li>
                                    {/* <li className="list-group-item d-flex">
                                        <span>Tax</span> <span className="ml-auto font-size-sm">{currency(taxPrice)}</span>
                                    </li> */}
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>{t('Total')}: </span> <span className="ml-auto font-size-sm" style={{ fontWeight: 'bold' }}>
                                            {
                                                complexList && complexList.map((i) => {
                                                    if (i.data && i.data.distributor && i.data.product && i.data.num && i.data.discountRate) {
                                                        total += (calculateTotal(i.data.product, i.data.num) - calculateTotal(i.data.product, i.data.num) * i.data.discountRate / 100 - calculateTotal(i.data.product, i.data.num))
                                                    }

                                                })

                                            }
                                            {
                                                currency(total)
                                            }
                                        </span>
                                    </li>
                                    {/* <li className="list-group-item font-size-sm text-center text-gray-500">
                                        Shipping cost calculated at Checkout *
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        {/* Button */}
                        <Link className="btn btn-block btn-dark mb-2" to="/checkout">{t('Continue checkout')}</Link>
                        {/* Link */}
                        <a className="btn btn-link btn-sm px-0 text-body" href="/">
                            <i className="fe fe-arrow-left mr-2" /> {t('Continue shopping')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewCart