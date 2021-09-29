
import React from 'react'

interface WishType {
    wishlist: any[]
}

export const WishItem: React.FC<WishType> = ({ wishlist }) => {
    return (
        // Item
        <div className="row">
            {
                wishlist.map((w: any) => {
                    return (
                        < div className="col-6 col-md-4" key={w.id}>
                        <div className="card mb-7">
                            {/* Image  */}
                            <div className="card-img">
                                {/* Action */}
                                <button className="btn btn-xs btn-circle btn-white-primary card-action card-action-right">
                                    <i className="fe fe-x" />
                                </button>
                                {/* Button */}
                                <button className="btn btn-xs btn-block btn-dark card-btn" data-toggle="modal" data-target="#modalProduct">
                                    <i className="fe fe-eye mr-2 mb-1" /> Quick View
                                </button>
                                {/* Image */}
                                <img className="card-img-top" src="/img/products/product-6.jpg" alt="..." />
                            </div>
                            {/* Body */}
                            <div className="card-body font-weight-bold text-center">
                                <a className="text-body" href="product.html">{w.userId}</a> <br />
                                <span className="text-muted">{w.title}</span>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}


