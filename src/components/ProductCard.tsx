
import { Product, Product01, Categories } from '../@types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from 'store/actions/cartAction'
import { Skeleton } from '@mui/material'
import { StateStore } from 'store'
import { useTranslate } from 'core'
import { convertQueryURLToObject, currency, changeQueryURL } from 'utils'

// export const ProductCard: React.FC<Product> = ({ name, price, real_price, slug, thumbnail_url }) => {
export const ProductCard: React.FC<{ product?: Product01, isActive?: boolean }> = ({ product, isActive }) => {
    console.log('Product: ', product)
    let objectURL = convertQueryURLToObject()
    const dispatch = useDispatch()
    let { login } = useSelector((store: StateStore) => store.auth)
    let { t } = useTranslate()
    // console.log(product.listPrice)
    // console.log('AAAAAAAAAAAAAAAAAAAAAA: ', isActive)
    return (
        <div className="col-6 col-md-4 product-item" > {/*style={{ margin: '10px 15px', border: '1px solid rgba(17, 17, 17, .125)' }} */}
            {/* Card */}
            <div className="card">
                {/* Badge */}
                {/* <div className="badge badge-white card-badge card-badge-left text-uppercase">
                    {product?.status === 0 ? <span style={{ color: 'red' }}>Ngừng bán</span> : product?.status === 1 ? <span style={{ color: '#6fbfc2' }}>Còn hàng</span> : product?.status === 2 && <span style={{ color: 'orange' }}>Hết hàng</span>}
                </div> */}
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
                                {
                                    !login ? <span className="card-action">
                                        {
                                            product && product.status === 1 && (
                                                <button onClick={() => { (product.listPrice && product.listPrice.length > 0) && dispatch(addToCart(product)) }} className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                                    <i className="fe fe-shopping-cart" />
                                                </button>
                                            )
                                        }
                                    </span> :
                                        (
                                            isActive && <span className="card-action">
                                                {
                                                    product && product.status === 1 && (
                                                        <button onClick={() => { (product.listPrice && product.listPrice.length > 0) && dispatch(addToCart(product)) }} className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                                            <i className="fe fe-shopping-cart" />
                                                        </button>
                                                    )
                                                }
                                            </span>
                                        )
                                }
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
                <div className="card-body px-0" >{/**style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', height: '130px'}} */}
                    {/* Category */}

                    {/* Title */}
                    <div className="font-weight-bold text-muted">
                        {
                            product ? (
                                <Link className="text-body text-muted" to={`/product/${product?.id}`} style={{ fontSize: '14px' }}>
                                    { product?.name.slice(0, 30) + (product?.name.length > 30 ? ' ...' : '')}
                                    {/* ({product && product.listPrice.length > 0 ? product.listPrice[0].volume + ' items' : '0 item'}) */}
                                </Link>
                            ) : <Skeleton width="100%" height={47} />

                        }
                    </div>
                    <div className="font-size-xs">
                        <Link className="" style={{ color: 'black', fontWeight:'bold',fontSize: '14px' }} to={changeQueryURL({ ...objectURL, SubCategoryId: '', PageNumber: 1, CategoryId: '', DistributorId: product?.distrubutorId })}>{product?.distributor}</Link>
                    </div>
                    {/* Price */}
                    <div className="" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {/* {price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} */}
                        {/* <h6 style={{color: 'red'}}>Price ?</h6> */}
                        {
                            product && product.listPrice && ((product.listPrice.length > 0) ?
                                `${product.listPrice.length > 1 ? (currency(product.listPrice[product.listPrice.length - 1].value) + ' - ') : ''}${currency(product.listPrice[0].value)}`
                                : <h6 style={{ color: 'red' }}>{t('No price')}</h6>)

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

