
import { Product, Product01, Categories } from '../@types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from 'store/actions/cartAction'
import { Skeleton } from '@mui/material'

// export const ProductCard: React.FC<Product> = ({ name, price, real_price, slug, thumbnail_url }) => {
export const ProductCard: React.FC<{product?: Product01}> = ( {product} ) => {
    const dispatch = useDispatch()

    // console.log(product.listPrice)

    return (
        <div className="col-6 col-md-4">
            {/* Card */}
            <div className="card mb-7">
                {/* Badge */}
                <div className="badge badge-white card-badge card-badge-left text-uppercase">
                    {product?.status === 0 ? <span style={{color: 'gray'}}>Ngừng bán</span> : product?.status === 1 ? <span style={{color: 'green'}}>Còn hàng</span> : product?.status === 2 && <span style={{color: 'redy'}}>Hết hàng</span>}
                </div>
                {/* Image */}
                <div className="card-img">
                    {/* Image */}
                    {/* <Link className="card-img-hover" to={`/product/${product.name}`}> */}
                        {/* <img className="card-img-top card-img-back" src={image} alt="..." /> */}
                        {/* <img className="card-img-top card-img-front" src={image} alt="..." /> */}
                        {
                            product ? (
                                <Link className="card-img-hover" to={`/product/${product.id}`}>
                                    <img className="card-img-top" src={product.image} alt="..." />
                                </Link>
                            ) : <Skeleton variant="rectangular" width={200} height={200} />
                        }
                        
                    {/* </Link> */}
                    {/* Actions */}
                    {
                        product && (
                            <div className="card-actions">
                                <span className="card-action">
                                    <Link className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct" to={`/product/${product.id}`}>
                                        <i className="fe fe-eye" />
                                    </Link>
                                </span>
                                <span className="card-action">
                                    {
                                        product && product.status === 1 && (
                                            <button onClick={() => {( product.listPrice.length > 0 ) && dispatch(addToCart(product)) }} className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                                <i className="fe fe-shopping-cart" />
                                            </button>
                                        )
                                    }

                                </span>
                                {/* <span className="card-action">
                                    <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                        <i className="fe fe-heart" />
                                    </button>
                                </span> */}
                            </div>
                        )
                    }
                </div>
                {/* Body */}
                <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">{}</a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                        {
                            product ? (
                                <Link className="text-body" to={`/${product?.name}`}>
                                    {product?.name} 
                                    {/* ({product && product.listPrice.length > 0 ? product.listPrice[0].volume + ' items' : '0 item'}) */}
                                </Link>
                            ) : <Skeleton width="100%" height={47} />

                        }
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">
                        {/* {price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} */}
                        {/* <h6 style={{color: 'red'}}>Price ?</h6> */}
                        {
                            product && ( (product.listPrice.length > 0) ? 
                            `${product.listPrice.length > 1 ? (product.listPrice[product.listPrice.length - 1].value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + ' - ') : '' }${product.listPrice[0].value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  ` 
                            : <h6 style={{color: 'red'}}>No price</h6> )
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

