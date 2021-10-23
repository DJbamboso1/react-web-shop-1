import { Categories, Product, Product01, Product02 } from '@types'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productService } from 'services/productService'
import Flickity from 'react-flickity-component'
import { useDispatch } from 'react-redux'
import { useCartNumber } from 'store/selector'
import { addToCart, cartDecrement, cartIncrement } from 'store/actions/cartAction'

const ProductDetail: React.FC = () => {
    let slug: any

    let num = useCartNumber()

    slug = useParams()
    let [data, setData] = useState<Product02<Product01>>()
    useEffect(() => {
        (async () => {
            let product = await productService.getProductById(slug.slug)
            console.log(product)
            setData(product)
        })()
    }, [])
    const dispatch = useDispatch()



    const _changeNumber = (ev: React.ChangeEvent<HTMLInputElement>) => {

        if (num > parseInt(ev.currentTarget.value)) {
            dispatch(cartDecrement(data?.data.id || ''))
        } else {
            dispatch(cartIncrement(data?.data.id || ''))
        }

    }
    return (
        <section style={{ padding: '40px 0px' }}>
            <div className="container">
                {data && (
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
                                            <Link className="text-muted" to={`product/${data.data.id}`}>{data.data.name}</Link>
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
                                    {/* Price */}
                                    <div className="mb-7">
                                        {/* <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">$115.00</span> */}
                                        <span className="ml-1 font-size-h5 font-weight-bolder text-primary">{data && ((data.data.listPrice.length > 0) ? data.data.listPrice[0].value : 'No price')}</span>
                                        {/* <span className="font-size-sm ml-1">(In Stock)</span> */}
                                    </div>
                                    {/* Form */}
                                    <form>
                                        {/* <div className="form-group">
                                        
                                        <p className="mb-5">
                                            Color: <strong id="colorCaption">White</strong>
                                        </p>
                                        
                                        <div className="mb-8 ml-n1">
                                            <div className="custom-control custom-control-inline custom-control-img">
                                                <input type="radio" className="custom-control-input" id="imgRadioOne" name="imgRadio" data-toggle="form-caption" data-target="#colorCaption" defaultValue="White" defaultChecked />
                                                <label className="custom-control-label" htmlFor="imgRadioOne">
                                                    <span className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: 'url(/img/products/product-7.jpg)' }} />
                                                </label>
                                            </div>
                                            <div className="custom-control custom-control-inline custom-control-img">
                                                <input type="radio" className="custom-control-input" id="imgRadioTwo" name="imgRadio" data-toggle="form-caption" data-target="#colorCaption" defaultValue="Black" />
                                                <label className="custom-control-label" htmlFor="imgRadioTwo">
                                                    <span className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: 'url(/img/products/product-49.jpg)' }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div> */}
                                        <div className="form-group">
                                            {/* Label */}
                                            <p className="mb-5">
                                                Volume:
                                            </p>
                                            {/* Radio */}
                                            <div className="mb-2">
                                                {
                                                    data && (data.data.listPrice.length > 0 ? data.data.listPrice.map(price => {
                                                        return (
                                                            <div className="custom-control custom-control-inline custom-control-size mb-2">
                                                                <input type="radio" className="custom-control-input" name="sizeRadio" id="sizeRadioOne" defaultValue={price.volume} data-toggle="form-caption" data-target="#sizeCaption" />
                                                                <label className="custom-control-label" htmlFor="sizeRadioOne">{price.volume}</label>
                                                            </div>
                                                        )
                                                    }) : 'No volume')
                                                }


                                            </div>
                                            {/* Size chart */}
                                            {/* <p className="mb-8">
                                                <img src="/img/icons/icon-ruler.svg" alt="..." className="img-fluid" /> <a className="text-reset text-decoration-underline ml-3" data-toggle="modal" href="#modalSizeChart">Size
                                                    chart</a>
                                            </p> */}
                                            <div className="form-row mb-7">
                                                <div className="col-12 col-lg-auto">
                                                    <input autoComplete="false" onChange={_changeNumber} type="number" className="cart-input-num" value={num} style={{ height: '90%' }} />
                                                </div>
                                                <div className="col-12 col-lg">
                                                    {/* Submit */}
                                                    <button type="submit" className="btn btn-block btn-dark mb-2" onClick={() => { data && ( data?.data.listPrice.length > 0 ) && dispatch(addToCart(data?.data)) }}>
                                                        Add to Cart <i className="fe fe-shopping-cart ml-2" />
                                                    </button>
                                                </div>
                                                {/* <div className="col-12 col-lg-auto">
                                                    
                                                    <button className="btn btn-outline-dark btn-block mb-2" data-toggle="button">
                                                        Wishlist <i className="fe fe-heart ml-2" />
                                                    </button>
                                                </div> */}
                                            </div>
                                            {/* Text */}
                                            {/* <p>
                                                <span className="text-gray-500">Is your size/color sold out?</span>
                                                <a className="text-reset text-decoration-underline" data-toggle="modal" href="#modalWaitList">Join the
                                                    Wait List!</a>
                                            </p>
                                            
                                            <p className="mb-0">
                                                <span className="mr-4">Share: </span>
                                                <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                                                    <i className="fab fa-pinterest-p" />
                                                </a>
                                            </p> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}


export default ProductDetail