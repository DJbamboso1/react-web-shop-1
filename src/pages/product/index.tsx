import { Categories, PaginateData, Product, Product01 } from '@types'
import { Pagination } from 'components/Pagination'
import { Paginate } from 'components/Paginate'
import { ProductCard } from 'components/ProductCard'
import React, { useEffect, useState } from 'react'
import { productService } from 'services/productService'
import { convertQueryURLToObject } from 'utils'
import { Filter } from './components'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchProducts } from 'store/sagas.ts/product'
// import { fetchProductsAction } from 'store/actions/productAction'
// import { StateStore } from 'store'
import Flickity from 'flickity'

export type FilterQuery = {
    page: string
}

const ProductPage: React.FC = () => {

    let elem = document.querySelector('.main-carousel') as any;
    let flkty = new Flickity(elem, {
        // options
        cellAlign: 'left',
        contain: true,
        autoPlay: true,
        wrapAround: true,
    });


    let [data, setData] = useState<PaginateData<Product01<Categories>>>()
    let queryUrl = convertQueryURLToObject<FilterQuery>()
    console.log("queryUrl: ", queryUrl)

    // let product = useSelector((store: StateStore) => store.product)
    // let dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let list = await productService.paginate(queryUrl)
            setData(list)
        })()
        // dispatch(fetchProductsAction(queryUrl))
        // setData(product.products)
    }, [queryUrl.page])

    const total = data?.total as number
    const pageSize = data?.pageSize as number
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
        pageNumber.push(i)
    }

    

    if (!data?.data) return null

    return (
        <section className="py-11">
            <div className="container">
                <div className="row">
                    <Filter />
                    <div className="col-12 col-md-8 col-lg-9">
                        {/* Slider */}
                        <div className="main-carousel flickity-page-dots-inner mb-9" data-flickity={flkty}>
                            {/* Item */}
                            <div className="carousel-cell w-100">
                                <div className="card bg-h-100 bg-left" style={{ backgroundImage: 'url(/img/covers/cover-24.jpg)' }}>
                                    <div className="row" style={{ minHeight: '400px' }}>
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 align-self-center">
                                            <div className="card-body px-md-10 py-11">
                                                {/* Heading */}
                                                <h4>
                                                    2019 Summer Collection
                                                </h4>
                                                {/* Button */}
                                                <a className="btn btn-link px-0 text-body" href="shop.html">
                                                    View Collection <i className="fe fe-arrow-right ml-2" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-2 col-lg-4 col-xl-6 d-none d-md-block bg-cover" style={{ backgroundImage: 'url(/img/covers/cover-16.jpg)' }} />
                                    </div>
                                </div>
                            </div>
                            {/* Item */}
                            <div className="carousel-cell w-100">
                                <div className="card bg-cover" style={{ backgroundImage: 'url(/img/covers/cover-29.jpg)' }}>
                                    <div className="row align-items-center" style={{ minHeight: '400px' }}>
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                                            <div className="card-body px-md-10 py-11">
                                                {/* Heading */}
                                                <h4 className="mb-5">Get -50% from Summer Collection</h4>
                                                {/* Text */}
                                                <p className="mb-7">
                                                    Appear, dry there darkness they're seas. <br />
                                                    <strong className="text-primary">Use code 4GF5SD</strong>
                                                </p>
                                                {/* Button */}
                                                <a className="btn btn-outline-dark" href="shop.html">
                                                    Shop Now <i className="fe fe-arrow-right ml-2" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Item */}
                            <div className="carousel-cell w-100">
                                <div className="card bg-cover" style={{ backgroundImage: 'url(/img/covers/cover-30.jpg)' }}>
                                    <div className="row align-items-center" style={{ minHeight: '400px' }}>
                                        <div className="col-12">
                                            <div className="card-body px-md-10 py-11 text-center text-white">
                                                {/* Preheading */}
                                                <p className="text-uppercase">Enjoy an extra</p>
                                                {/* Heading */}
                                                <h1 className="display-4 text-uppercase">50% off</h1>
                                                {/* Link */}
                                                <a className="link-underline text-reset" href="shop.html">Shop Collection</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            {
                                data.data.map(e => <ProductCard key={e.id} {...e} />)
                                // data.map(pro => <ProductCard key={pro.id} {...pro}/>)
                            }
                        </div>
                        {/* Pagination */}
                        <Paginate currentPage={data.pageNumber} totalPage={pageNumber.length} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage
