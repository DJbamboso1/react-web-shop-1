import { Categories, CategoryTree, Distributor, PaginateData, Product, Product01, User } from '@types'
import { Pagination } from 'components/Pagination'
import { Paginate } from 'components/Paginate'
import { ProductCard } from 'components/ProductCard'
import React, { useEffect, useState } from 'react'
import { productService } from 'services/productService'
import { changeQueryURL, convertQueryURLToObject } from 'utils'
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
import { useCart } from 'store/selector'
import { Link } from 'react-router-dom'
import distributorService from 'services/distributorService'
import authService from 'services/authService'

export type FilterQuery = {
    // page: string,
    SearchValue?: string
    DistributorId?: string
    CategoryId?: string
    Status?: string
    PageNumber?: string
    SubCategoryId?: string
    PageSize?: string
}

const ProductPage: React.FC = () => {
    // console.log('LIST: ', list )

    let [data, setData] = useState<PaginateData<Product01>>()

    let [cateData, setCateData] = useState<CategoryTree[]>()

    // let [cateDisData, setCateDisData] = useState<Distributor<User>>()

    let queryUrl = convertQueryURLToObject<FilterQuery>()
    // console.log("queryUrl: ", queryUrl)

    let { url } = useRouteMatch()

    let [category, setCategory] = useState<CategoryTree>()

    let [subCate, setSubCate] = useState<CategoryTree>()

    let [status, setStatus] = useState(-2)

    let [queryUrlCate, setQueryUrlCate] = useState('')

    let [distributor, setDistributor] = useState<User>()

    useEffect(() => {
        (async () => {
            if (status > -2) {
                // console.log('YO !')
                queryUrl.Status = status.toString()
                changeQueryURL({ ...queryUrl, Status: status.toString() })
            }
            if (queryUrl.DistributorId) {
                let cateDis = await distributorService.getDistributor()
                let dis = cateDis.data.find(e => e.id === queryUrl.DistributorId)
                console.log('DIS: ', dis)
                // setQueryUrlCate({ DistributorId: queryUrl.DistributorId })
                if (dis) {
                    let user = await authService.getInfo(dis.userId)
                    // console.log('DISTRIBUTOR USER: ', user)
                    setDistributor(user)
                    setQueryUrlCate(dis.id)
                }
            } else {
                setDistributor(undefined) 
            }
            // console.log(status)
            queryUrl.PageSize = '12'
            let list = await productService.paginate(queryUrl)
            setData(list)
            let cateList = await cateService.getCategory(queryUrl)
            console.log('CATE LIST: ', cateList)
            setCateData(cateList.data)
            if (queryUrl.CategoryId) {
                let category = cateList.data.find(e => e.id === queryUrl.CategoryId)
                    if (category) {
                        setCategory(category)
                        setSubCate(category?.subCategories?.find(e => e.id === queryUrl.SubCategoryId))
                    }
            } else {
                setCategory(undefined)
                setSubCate(undefined)
            }
            if (queryUrl.DistributorId) {

            }
        })()
        // dispatch(fetchProductsAction(queryUrl))
        // setData(product.products)
    }, [queryUrl.PageNumber, queryUrl.CategoryId, queryUrl.SubCategoryId, status, queryUrl.DistributorId])



    // console.log("data: ", data)

    const total = data?.total as number
    const pageSize = data?.pageSize as number
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
        pageNumber.push(i)
    }
    // console.log(queryUrl)
    // console.log('sjfbvuysgdviuwguvfwjevgiuwehgvw: ', cateDisData)

    return (
        <section className="py-5">
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
                                <h3 className="mb-1">{ distributor?.data.displayName || 'Sản phẩm'}</h3>
                                {/* Breadcrumb */}
                                <Breadcrumbs list={[
                                    {
                                        title: 'Trang chủ',
                                        link: '/'
                                    },

                                    ...(distributor ? [{
                                        title: distributor.data.displayName,
                                        link: `${url}?DistributorId=${queryUrlCate}`
                                    }] : []),

                                    ...(category ? [{
                                        title: category.name,
                                        link: `${url}?CategoryId=${category.id}${distributor ? `&DistributorId=${queryUrlCate}` : ''}`
                                    }] : []),

                                    ...(subCate ? [{
                                        title: subCate.name,
                                        link: ''
                                    }] : [])
                                ]} />
                            </div>
                            <div className="col-12 col-md-auto">
                                {/* Select */}
                                <form>
                                    <select className="custom-select custom-select-xs" onChange={(ev) => { setStatus(parseInt(ev.currentTarget.value)) }}>
                                        <option value=''>
                                            trạng thái
                                        </option>
                                        <option value="0">
                                            {/* <Link to={ status > -2 ? changeQueryURL({ ...queryUrl, Status: status }) : '#' }>Ngừng bán</Link> */}
                                            Ngừng bán
                                        </option>
                                        <option value="1">Còn hàng</option>
                                        <option value="2">Hết hàng</option>
                                    </select>
                                </form>
                                {/* <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0px' }}>
                                    <form >
                                        
                                        Trạng thái: <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }} onChange={(ev) => { setStatus(parseInt(ev.currentTarget.value)) }} >
                                            <option value="-1">Đang thành tiền</option>
                                            <option value="0">Đã hủy</option>
                                            <option value="1">Đã thành tiền</option>
                                            <option value="2">Chưa tính tiền</option>
                                        </select>
                                    </form>
                                </div> */}
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
