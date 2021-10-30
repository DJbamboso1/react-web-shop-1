import { Categories, Product, Product01 } from '@types'
import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StateStore } from 'store'
import { cartDecrement, cartIncrement, cartRemove, toggleCart } from 'store/actions/cartAction'
import { getSubtotal, useCartNumber } from 'store/selector'
import { useHistory } from 'react-router-dom'
import { currency, getPricePerPro } from 'utils'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants'


export const CartModal: React.FC = () => {
    let { openCart, list } = useSelector((store: StateStore) => store.cart)

    let num = useCartNumber()
    const dispatch = useDispatch()
    const history = useHistory()
    const subtotal = useSelector(getSubtotal)

    let [price, setPrice] = useState(0)

    useEffect(() => {
        if (openCart) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
    }, [openCart])

    const _preventViewCart = useCallback((ev: React.MouseEvent) => {
        if (list.length === 0) {
            ev.preventDefault();
            history.push('/product')
        }
        dispatch(toggleCart(false))
    }, [list])

    return ReactDOM.createPortal(
        <div onClick={(ev) => { dispatch(toggleCart(false)) }} className={`modal fixed-right fade ${openCart ? 'show' : ''}`} style={{ display: openCart ? 'block' : 'none' }} id="modalShoppingCart" tabIndex={-1} role="dialog" aria-hidden="true">
            <div style={{ transition: 'transform .3s ease-out' }} onClick={ev => ev.stopPropagation()} className="modal-dialog modal-dialog-vertical" role="document">
                {/* Full cart (add `.d-none` to disable it) */}
                {
                    list.length > 0 ? <div className="modal-content">
                        {/* Close */}
                        <button type="button" onClick={(ev) => dispatch(toggleCart(false))} className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fe fe-x" aria-hidden="true" />
                        </button>
                        {/* Header*/}
                        <div className="modal-header line-height-fixed font-size-lg">
                            <strong className="mx-auto">Your Cart ({list.length})</strong>
                        </div>
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush">
                            {
                                list.map(e => <CartItem key={e.product.id} {...e} />)
                            }
                        </ul>
                        {/* Footer */}
                        <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
                            <strong>Subtotal</strong> <strong className="ml-auto">{currency(subtotal)}</strong>
                        </div>
                        {/* Buttons */}
                        <div className="modal-body">
                            <Link className="btn btn-block btn-dark" to="/checkout" onClick={_preventViewCart}>Continue to Checkout</Link>
                            <Link className="btn btn-block btn-outline-dark" to="/view-cart" onClick={_preventViewCart}>View Cart</Link>
                        </div>
                    </div> :
                        <div className="modal-content ">
                            {/* Close */}
                            <button type="button" onClick={(ev) => dispatch(toggleCart(false))} className="close" data-dismiss="modal" aria-label="Close">
                                <i className="fe fe-x" aria-hidden="true" />
                            </button>
                            {/* Header*/}
                            <div className="modal-header line-height-fixed font-size-lg">
                                <strong className="mx-auto">Your Cart ({list.length})</strong>
                            </div>
                            {/* Body */}
                            <div className="modal-body fldsaex-grow-0 my-auto">
                                {/* Heading */}
                                <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
                                {/* Button */}
                                <a className="btn btn-block btn-outline-dark" href="/product">
                                    Continue Shopping
                                </a>
                            </div>
                        </div>
                }

                {/* Empty cart (remove `.d-none` to enable it) */}

            </div>
            {
                openCart && <BackDrop onClick={() => dispatch(toggleCart(false))} />
            }
        </div >
        , document.body)
}

const CartItem: React.FC<{
    product: Product01,
    num: number
}> = ({ num, product }) => {

    const dispatch = useDispatch()

    const _changeNumber = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log(ev.currentTarget.value)
        if (ev.currentTarget.value === '') {

        } else {
            let offset = num - parseInt(ev.currentTarget.value || '0')
            console.log(offset)
            if (offset > 0) {
                dispatch(cartDecrement({ id: product.id, num: offset }))
            } else if (offset < 0) {
                dispatch(cartIncrement({ id: product.id, num: Math.abs(offset) }))
            }
        }


    }

    let { id, distributor, subCategory, description, image, minQuantity, name, status, listPrice } = product
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
                        <Link className="text-body" to={`product/${id}`}>{name} ({listPrice.length > 0 ? listPrice[0].volume + ' items' : '0 item'})</Link> <br />
                        <span className="text-muted">
                            {`${currency(getPricePerPro(product, num))} / item`}
                            {/* {product && ((product.listPrice.length > 0) ?
                                <>
                                    {

                                        num <= product.listPrice[0].volume ? product.listPrice[0].value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) :
                                            () => {
                                                product.listPrice.map(price => {
                                                    if (price.volume <= num) {
                                                       return price.value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    }
                                                    return price
                                                }
                                                )
                                            }
                                    }
                                </>
                                : <h6 style={{ color: 'red' }}>No price</h6>)} */}
                        </span>
                    </p>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        <input autoComplete="false" onChange={_changeNumber} type="number" className="cart-input-num" value={num} min={minQuantity} />
                        {/* Remove */}
                        <a onClick={(ev) => {
                            ev.preventDefault()
                            dispatch(cartRemove(id))
                        }} className="font-size-xs text-gray-400 ml-auto" href="">
                            <i className="fe fe-x" /> Remove
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}

const BackDrop: React.FC<{
    onClick?: (ev: React.MouseEvent) => void
}> = ({ onClick }) => {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.modal-backdrop')?.classList.add('show')
        })
        return () => {
            document.querySelector('.modal-backdrop')?.classList.remove('show')
        }
    }, [])

    return ReactDOM.createPortal(<div onClick={onClick} className="modal-backdrop fade "></div>, document.body)
}