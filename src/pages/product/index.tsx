import { Categories, CategoryTree, PaginateData, Product, Product01 } from '@types'
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
import { Slider } from './components'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { title } from 'process'
import cateService from 'services/cateService'
import { categoryConfig } from './categoryConfig'
import { useRouteMatch } from 'react-router'

export type FilterQuery = {
    // page: string,
    SearchValue?: string
    DistributorId?: string
    CategoryId?: string
    Status?: string
    PageNumber?: string
    SubCategoryId?: string
}

const ProductPage: React.FC = () => {


    let [data, setData] = useState<PaginateData<Product01>>()

    let [cateData, setCateData] = useState<CategoryTree[]>()

    let queryUrl = convertQueryURLToObject<FilterQuery>()
    // console.log("queryUrl: ", queryUrl)

    let { url } = useRouteMatch()

    let [category, setCategory] = useState<CategoryTree>()

    let [subCate, setSubCate] = useState<CategoryTree>()

    useEffect(() => {

        (async () => {
            let list = await productService.paginate(queryUrl)
            setData(list)
            let cateList = await cateService.getCategory()
            setCateData(cateList.data)

            let category = cateList.data.find(e => e.id === queryUrl.CategoryId)
            setCategory(category)
            setSubCate(category?.subCategories?.find(e => e.id === queryUrl.SubCategoryId))
        })()
        // dispatch(fetchProductsAction(queryUrl))
        // setData(product.products)
    }, [queryUrl.PageNumber, queryUrl.CategoryId, queryUrl.SubCategoryId])

    console.log("data: ", data)

    const total = data?.total as number
    const pageSize = data?.pageSize as number
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
        pageNumber.push(i)
    }


    return (
        <section className="py-11">
            <div className="container">
                <div className="row">
                    {/* <Filter /> */}
                    <Filter cateData={cateData} />

                    <div className="col-12 col-md-8 col-lg-9">
                        {/* Slider */}
                        <Slider />
                        {/* Header */}
                        <div className="row align-items-center mb-7">
                            <div className="col-12 col-md">
                                {/* Heading */}
                                <h3 className="mb-1">Product</h3>
                                {/* Breadcrumb */}
                                <Breadcrumbs list={[
                                    {
                                        title: 'Home',
                                        link: '/'
                                    },
                                    ...(category ? [{
                                        title: category.name,
                                        link: `${url}?CategoryId=${category.id}`
                                    }] : [{
                                        title: 'Product',
                                        link: '/product'
                                    }]),
                                    ...(subCate ? [{
                                        title: subCate.name,
                                        link: ''
                                    }] : [])
                                ]} />
                            </div>
                            <div className="col-12 col-md-auto">
                                {/* Select */}
                                {/* <select className="custom-select custom-select-xs">
                                    <option selected>Most popular</option>
                                </select> */}
                            </div>
                        </div>
                        {/* Tags */}
                        {/* <div className="row mb-7">
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
                        </div> */}
                        {/* Products */}
                        {
                            data && (data.data.length < 1 && <h5 className='error-text'>Empty products</h5>)
                        }
                        <div className="row">
                            {
                                typeof data === 'undefined' ? [...Array(30)].map((e, i) => <ProductCard key={i} />) :
                                    data.data.map(e => <ProductCard key={e.id} product={e} />)
                            }
                            {/* {
                                data.data.map(e => <ProductCard key={e.id} product={e} />)
                                // data.map(pro => <ProductCard key={pro.id} {...pro}/>)
                            } */}
                        </div>
                        {/* Pagination */}
                        {
                            data && <Paginate currentPage={data.pageNumber} totalPage={pageNumber.length} />
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage
