import { Categories, Product, Product01, Product02 } from '@types'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productService } from 'services/productService'
import Flickity from 'react-flickity-component'
import { useDispatch, useSelector } from 'react-redux'
import { useCartNumber } from 'store/selector'
import { addToCart, cartDecrement, cartIncrement } from 'store/actions/cartAction'
import { currency } from 'utils'
import { getPricePerPro, calculateTotal } from 'store/selector'
import { style } from '@mui/system'
import LoadingPage from 'components/LoadingPage'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { Redirect, useHistory } from 'react-router'
import { StateStore } from 'store'
import authService from 'services/authService'
import { RelatedProducts } from './components/RelatedProducts'
import Page404 from 'pages/404'

const ProductDetail: React.FC = () => {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let history = useHistory()

    let num = useCartNumber()

    let { slug } = useParams<{ slug: string }>()
    let [data, setData] = useState<Product02<Product01>>()
    let [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    let { user } = useSelector((store: StateStore) => store.auth)
    let [isActive, setIsActive] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                let product = await productService.getProductById(slug)
                // console.log(product)
                if (product) {
                    setData(product)
                    setLoading(false)
                }

            } catch (err) {
                console.log('kjieurgiuieughierug')
                return Page404
            }
        })()
    }, [num, slug])


    useEffect(() => {
        (async () => {
            let retailer = await authService.getRetailerById(user?.actorId || '')
            if (retailer && retailer.data) {
                setIsActive(retailer.data.isActive)
            }
        })()
    }, [])

    // console.log('num: ', num)

    if (loading) {
        return <LoadingPage />
    }
    console.log('isActive: ', isActive)
    return (
        <>
            {data && data.data ? (
                <>
                    <section style={{ padding: '40px 0px' }}>
                        <div className="container">
                            {
                                data && <Breadcrumbs list={[
                                    {
                                        title: 'Home',
                                        link: '/',
                                        onClick: () => { history.goBack() }
                                    },
                                    {
                                        title: `${data.data && data.data.name}`,
                                        link: ''
                                    }
                                ]} />
                            }
                            {data && data.data ? (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                {/* Card */}
                                                <div className="card">
                                                    {/* Badge */}
                                                    {/* <div className="badge badge-primary card-badge text-uppercase">
                                        Sale
                                    </div> */}

                                                    {/* Slider */}
                                                    {/* <div className="mb-4" data-flickity="{&quot;draggable&quot;: false, &quot;fade&quot;: true}" id="productSlider">
                                        
                                        <a href="/img/products/product-7.jpg" data-fancybox>
                                            <img src="/img/products/product-7.jpg" alt="..." className="card-img-top" />
                                        </a>
                                        
                                        <a href="/img/products/product-122.jpg" data-fancybox>
                                            <img src="/img/products/product-122.jpg" alt="..." className="card-img-top" />
                                        </a>
                                        
                                        <a href="/img/products/product-146.jpg" data-fancybox>
                                            <img src="/img/products/product-146.jpg" alt="..." className="card-img-top" />
                                        </a>
                                    </div> */}
                                                </div>
                                                {/* Slider */}
                                                {/* <Flickity className="flickity-nav mx-n2 mb-10 mb-md-0" options={{
                                        pageDots: false,
                                        autoPlay: false,
                                        wrapAround: false,

                                    }}>

                                        <div className="col-12 px-2" style={{ maxWidth: '100%' }}>

                                            <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `${data.data.image}` }} />
                                        </div>
                                    </Flickity> */}
                                                <img className="col-12 px-2" style={{ maxWidth: '100%' }} src={data.data.image} alt="" />
                                                {/* <div className="col-12 px-2" style={{ maxWidth: '100%' }}>
                                        <div className="embed-responsive embed-responsive-1by1 bg-cover">
                                            <img src={data.data.image} alt="" />
                                        </div>
                                    </div> */}
                                            </div>
                                            <div className="col-12 col-md-6 pl-lg-10">
                                                {/* Header */}
                                                <div className="row mb-1">
                                                    <div className="col">
                                                        {/* Preheading */}
                                                        <Link className="text-muted" to={`product/${data.data.id}`}>{data.data.parentCategoryName}</Link>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Rating */}
                                                        {/* <div className="rating font-size-xs text-dark" data-value={4}>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="rating-item">
                                                    <i className="fas fa-star" />
                                                </div>
                                            </div> */}
                                                        {/* <a className="font-size-sm text-reset ml-2" href="#reviews">
                                                Reviews (6)
                                            </a> */}
                                                    </div>
                                                </div>
                                                {/* Heading */}
                                                <h3 className="mb-2">{data.data.name}</h3>
                                                <h6 className="mb-2">Nhà phân phối: {data.data.distributor}</h6>
                                                {/* Price */}
                                                <div className="mb-7">
                                                    {/* <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">$115.00</span> */}

                                                    {
                                                        data && data.data.listPrice && ((data.data.listPrice.length > 0) ?
                                                            `${data.data.listPrice.length > 1 ? currency(data.data.listPrice[data.data.listPrice.length - 1].value) + ' - ' : ''}${currency(data.data.listPrice[0].value)}  `
                                                            : <h6 style={{ color: 'red' }}>No price</h6>)
                                                    }
                                                </div>

                                                <table style={{ overflowX: 'auto' }}>
                                                    <tr>
                                                        <th>Số lượng</th>
                                                        <th>Giá</th>
                                                    </tr>
                                                    {data.data.listPrice && data.data.listPrice.map(price => {
                                                        return (
                                                            <tr>
                                                                <th>{`>= ${price.volume} món`}</th>
                                                                <th> {currency(price.value)}</th>
                                                            </tr>
                                                        )
                                                    })}
                                                </table>

                                                {/* Form */}
                                                <form>
                                                    <div className="form-group">
                                                        {/* Label */}
                                                        {/* Size chart */}
                                                        {/* <p className="mb-8">
                                                <img src="/img/icons/icon-ruler.svg" alt="..." className="img-fluid" /> <a className="text-reset text-decoration-underline ml-3" data-toggle="modal" href="#modalSizeChart">Size
                                                    chart</a>
                                            </p> */}
                                                        <div className="form-row mb-7">
                                                            {/* <div className="col-12 col-lg-auto">
                                                        {num > 0 && <input onChange={_changeNumber} type="number" className="cart-input-num" value={num} style={{ height: '90%' }} />}
                                                    </div> */}
                                                            <div className="col-12 col-lg" style={{ flexBasis: num === 0 ? 'unset' : 0 }}>
                                                                {/* Submit */}
                                                                {
                                                                    <button disabled={isActive === true ? (data && data.data.status === 1 ? false : true) : true} type="submit" className="btn btn-block btn-dark mb-2" onClick={(ev) => { ev.preventDefault(); data && (data.data.listPrice && data.data.listPrice.length > 0) && dispatch(addToCart(data.data)) }}>
                                                                        Thêm vào giỏ hàng <i className="fe fe-shopping-cart ml-2" />
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : <Page404 />}
                        </div>
                    </section>
                    <section className="pt-11">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {/* Nav */}
                                    <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                                        <a className="nav-link active" data-toggle="tab" href="#descriptionTab">
                                            Description
                                        </a>
                                        {/* <a className="nav-link" data-toggle="tab" href="#sizeTab">
                                    Size &amp; Fit
                                </a>
                                <a className="nav-link" data-toggle="tab" href="#shippingTab">
                                    Shipping &amp; Return
                                </a> */}
                                    </div>
                                    {/* Content */}
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="descriptionTab">
                                            <div className="row justify-content-center py-9">
                                                <div className="col-12 col-lg-10 col-xl-8">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {/* Text */}
                                                            <p className="text-gray-500">
                                                                {data && data.data && data.data.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <RelatedProducts />
                </>
            ) : <Page404 />}
        </>
    )
}


export default ProductDetail