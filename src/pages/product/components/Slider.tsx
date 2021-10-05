import React from 'react'

export const Slider: React.FC = () => {
    return (
        <div className="flickity-page-dots-inner mb-9" data-flickity="{&quot;pageDots&quot;: true}">
            {/* Item */}
            <div className="w-100">
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
            <div className="w-100">
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
            <div className="w-100">
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
    )
}

export default Slider

