import { Categories, Product, Product01 } from '../@types'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { StateStore } from 'store'
import { cartDecrement, cartIncrement, cartRemove, toggleCart } from '../store/actions/cartAction'
import { useCartNumber } from '../store/selector'
import { currency } from 'utils'
import { calculateTotal, getPricePerPro } from 'store/selector/cartSelector'

export const ProductItem: React.FC<{ product: Product01, num: number }> = ({ product, num }) => {

    const dispatch = useDispatch()
    const _changeNumber = (ev: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(ev.currentTarget.value)
        if (ev.currentTarget.value === '' || parseInt(ev.currentTarget.value) < product.minQuantity) {
            dispatch(cartDecrement({ id: product.id, num: num }))
            ev.currentTarget.value = product.minQuantity.toString()
        } else {
            let offset = num - parseInt(ev.currentTarget.value || '0')
            // console.log(offset)
            if (offset > 0) {
                dispatch(cartDecrement({ id: product.id, num: offset }))
            } else if (offset < 0) {
                dispatch(cartIncrement({ id: product.id, num: Math.abs(offset) }))
            }
        }
    }

    console.log(product)
    // console.log(thumbnail_url)
    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-3">
                    {/* Image */}
                    <Link className="card-img-hover" to={`/product/${product.name}`}>
                        <img className="img-fluid" src={product.image} alt="..." />
                    </Link>
                </div>
                <div className="col">
                    {/* Title */}
                    <div className="d-flex mb-2 font-weight-bold">
                        <Link className="text-body" to={`/${product.name}`}>{product.name}</Link> <span className="ml-auto" style={{ fontWeight: 'bold' }}>{`${currency(getPricePerPro(product, num))}`}</span>
                        {/* <span className="text-muted">
                            Nhà phân phối: {product.distributor}
                            <br/>
                            
                            <br/>
                            {product.description.slice(0, 40) + '......'}
                        </span> */}
                    </div>
                    <p className="mb-7 font-size-sm text-muted">
                        Nhà phân phối: {product.distributor}
                        <br />
                        Đặc tả: {product.description.slice(0, 40) + (product.description.length > 40 ? ' ...' : '')}
                    </p>
                    {/*Footer */}
                    {
                        num && (
                            <>
                                <div className="d-flex align-items-center">
                                    {/* Select */}
                                    <input autoComplete="false" onBlur={_changeNumber} onClick={_changeNumber as any} type="number" className="cart-input-num" defaultValue={num} min={product.minQuantity} style={{ width: '30%' }} />
                                    {/* Remove */}
                                    <a onClick={(ev) => { ev.preventDefault(); dispatch(cartRemove(product.id)) }} className="font-size-xs text-gray-400 ml-auto" href="#!">
                                        <i className="fe fe-x" /> Xóa
                                    </a>

                                </div>
                                <br></br>
                                Tổng: {currency(calculateTotal(product, num))}
                            </>

                        )
                    }
                </div>
            </div>
        </li>
    )
}