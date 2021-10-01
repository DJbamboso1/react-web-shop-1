import React from 'react'
import Categories from 'pages/home/components/Categories'
import Slider from 'components/Slider'

const ProductPage: React.FC = () => {
    return (
        <section className="py-11">
            <div className="container">
                <div className="row">
                   <Categories/>
                    <div className="col-12 col-md-8 col-lg-9">
                        {/* Slider */}
                        <Slider/>

                        {/* Header */}
                        <div className="row align-items-center mb-7">
                            <div className="col-12 col-md">
                                {/* Heading */}
                                <h3 className="mb-1">Womens' Clothing</h3>
                                {/* Breadcrumb */}
                                <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                                    <li className="breadcrumb-item">
                                        <a className="text-gray-400" href="index.html">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Women's Clothing
                                    </li>
                                </ol>
                            </div>
                            <div className="col-12 col-md-auto">
                                {/* Select */}
                                <select className="custom-select custom-select-xs">
                                    <option selected>Most popular</option>
                                </select>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="row mb-7">
                            <div className="col-12">
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Shift dresses <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Summer <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    M <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    White <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Red <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    Adidas <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    $10.00 - $49.00 <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                                <span className="btn btn-xs btn-light font-weight-normal text-muted mr-3 mb-3">
                                    $50.00 - $99.00 <a className="text-reset ml-2" href="#!" role="button">
                                        <i className="fe fe-x" />
                                    </a>
                                </span>
                            </div>
                        </div>
                        
                        {/* Products */}
                        <div className="row">
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
                                        <a className="card-img-hover" href="product.html">
                                            <img className="card-img-top card-img-back" src="/img/products/product-120.jpg" alt="..." />
                                            <img className="card-img-top card-img-front" src="/img/products/product-5.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Shoes</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Leather mid-heel Sandals
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $129.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a className="card-img-hover" href="product.html">
                                            <img className="card-img-top card-img-back" src="/img/products/product-121.jpg" alt="..." />
                                            <img className="card-img-top card-img-front" src="/img/products/product-6.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Dresses</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Cotton floral print Dress
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $40.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Badge */}
                                    <div className="badge badge-dark card-badge card-badge-left text-uppercase">
                                        Sale
                                    </div>
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a className="card-img-hover" href="product.html">
                                            <img className="card-img-top card-img-back" src="/img/products/product-122.jpg" alt="..." />
                                            <img className="card-img-top card-img-front" src="/img/products/product-7.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Shoes</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Leather Sneakers
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold">
                                            <span className="font-size-xs text-gray-350 text-decoration-line-through">$85.00</span>
                                            <span className="text-primary">$85.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a href="#!">
                                            <img className="card-img-top card-img-front" src="/img/products/product-8.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Tops</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Cropped cotton Top
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $29.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a href="#!">
                                            <img className="card-img-top card-img-front" src="/img/products/product-9.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Dresses</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Floral print midi Dress
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $50.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Badge */}
                                    <div className="badge badge-dark card-badge card-badge-left text-uppercase">
                                        Sale
                                    </div>
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a className="card-img-hover" href="product.html">
                                            <img className="card-img-top card-img-back" src="/img/products/product-123.jpg" alt="..." />
                                            <img className="card-img-top card-img-front" src="/img/products/product-10.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Bags</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Suede cross body Bag
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold">
                                            <span className="font-size-xs text-gray-350 text-decoration-line-through">$79.00</span>
                                            <span className="text-primary">$49.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a className="card-img-hover" href="product.html">
                                            <img className="card-img-top card-img-back" src="/img/products/product-124.jpg" alt="..." />
                                            <img className="card-img-top card-img-front" src="/img/products/product-11.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Skirts</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Printed A-line Skirt
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $79.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4">
                                {/* Card */}
                                <div className="card mb-7">
                                    {/* Badge */}
                                    <div className="badge badge-white card-badge card-badge text-uppercase">
                                        New
                                    </div>
                                    {/* Image */}
                                    <div className="card-img">
                                        {/* Image */}
                                        <a href="#!">
                                            <img className="card-img-top card-img-front" src="/img/products/product-12.jpg" alt="..." />
                                        </a>
                                        {/* Actions */}
                                        <div className="card-actions">
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                                                    <i className="fe fe-eye" />
                                                </button>
                                            </span>
                                            <span className="card-action">
                                                <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
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
                                            <a className="text-muted" href="shop.html">Shoes</a>
                                        </div>
                                        {/* Title */}
                                        <div className="font-weight-bold">
                                            <a className="text-body" href="product.html">
                                                Heel strappy Sandals
                                            </a>
                                        </div>
                                        {/* Price */}
                                        <div className="font-weight-bold text-muted">
                                            $90.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pagination */}
                        <nav className="d-flex justify-content-center justify-content-md-end">
                            <ul className="pagination pagination-sm text-gray-400">
                                <li className="page-item">
                                    <a className="page-link page-link-arrow" href="#">
                                        <i className="fa fa-caret-left" />
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">4</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">5</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">6</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link page-link-arrow" href="#">
                                        <i className="fa fa-caret-right" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage
