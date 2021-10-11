import { Categories, Product, Product01 } from '../@types'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { StateStore } from 'store'
import { cartDecrement, cartIncrement, cartRemove, toggleCart } from '../store/actions/cartAction'
import { useCartNumber } from '../store/selector'


export const ProductItem: React.FC<{ product: Product01<Categories>, num?: number }> = ({ product, num }) => {

    const dispatch = useDispatch()
    const _changeNumber = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if(!num) return
        if (num > parseInt(ev.currentTarget.value)) {
            dispatch(cartDecrement(product.id))
        } else {
            dispatch(cartIncrement(product.id))
        }

    }

    let { id, distributorId, category, description, image, minQuantity, name, status } = product
    // console.log(thumbnail_url)
    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-4">
                    {/* Image */}
                    <Link className="card-img-hover" to={`/product/${name}`}>
                        <img className="img-fluid" src={image} alt="..." />
                    </Link>
                </div>
                <div className="col-8">
                    {/* Title */}
                    <p className="font-size-sm font-weight-bold mb-6">
                        <a className="text-body" href="./product.html">{name}</a> <br />
                        <span className="text-muted">
                            {/* {real_price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} */}
                        </span>
                    </p>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        <input autoComplete="false" onChange={_changeNumber} type="number" className="cart-input-num" value={num} />
                        {/* Remove */}
                        <a onClick={() => dispatch(cartRemove(id))} className="font-size-xs text-gray-400 ml-auto" href="#">
                            <i className="fe fe-x" /> Remove
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}