
import { Product, Product01, Categories } from '../@types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from 'store/actions/cartAction'

interface Products {
    id: string 
    distributorId: string
    category: Categories
    name: string
    image: string
    description: string
    minQuantity: number
    status: any
}

// export const ProductCard: React.FC<Product> = ({ name, price, real_price, slug, thumbnail_url }) => {
export const ProductCard: React.FC<Product01<Categories>> = ( product: Products ) => {
    const dispatch = useDispatch()
    return (
        <div className="col-6 col-md-4">
            {/* Card */}
            <div className="card mb-7">
                {/* Badge */}
                <div className="badge badge-white card-badge card-badge-left text-uppercase">
                    New
                </div>
                {/* Image */}
                <div className="card-img">
                    {/* Image */}
                    <Link className="card-img-hover" to={`/product/${product.name}`}>
                        {/* <img className="card-img-top card-img-back" src={image} alt="..." /> */}
                        {/* <img className="card-img-top card-img-front" src={image} alt="..." /> */}
                        <img className="card-img-top" src={product.image} alt="..." />
                    </Link>
                    {/* Actions */}
                    <div className="card-actions">
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                <i className="fe fe-eye" />
                            </button>
                        </span>
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" onClick={() => dispatch(addToCart(product))} data-toggle="button">
                                <i className="fe fe-shopping-cart" />
                            </button>
                        </span>
                        <span className="card-action">
                            <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                <i className="fe fe-heart" />
                            </button>
                        </span>
                    </div>
                </div>
                {/* Body */}
                <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">{}</a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                        <Link className="text-body" to={`/product/${product.name}`}>
                            {}
                        </Link>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">
                        {/* {price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} */}
                        <h6 style={{color: 'red'}}>Price ?</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

