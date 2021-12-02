import Flickity from 'react-flickity-component'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Categories, PaginateData, Product, Product01, Product02} from '../../../@types'
import { productService } from '../../../services/productService'
import { useSelector } from 'react-redux'
import { StateStore } from 'store'
import authService from 'services/authService'
import { ProductCard } from 'components/ProductCard'

interface SliderProp extends React.HTMLAttributes<HTMLDivElement> {
}

export const RelatedProducts: React.FC<SliderProp> = () => {
    let { slug } = useParams<{ slug: string }>()
    let { user } = useSelector((store: StateStore) => store.auth)
    let [loading, setLoading] = useState(false)
    let [isActive, setIsActive] = useState(true)
    let [products, setProducts] = useState<PaginateData<Product01>>()
    useEffect(() => {
        (async () => {
            setLoading(true)
            let data = await productService.getRecommendation()
            if (data) {
                setProducts(data)
                setLoading(true)
            }
            let retailer = await authService.getRetailerById(user?.actorId || '')
            if (retailer && retailer.data) {
                setIsActive(retailer.data.isActive)
            }
        })()
    }, [slug])
    console.log(products)
    return (
        <div className='container related-product'>
            <Flickity className="flickity-page-dots-inner mb-9" options={{
                            pageDots: false,
                            autoPlay: true,
                            initialIndex: 3,
                            wrapAround: true,
                        }}>
                {
                    products?.data.map(b => {
                        return (
                            <ProductCard key={b.id} product={b} isActive={isActive}/>
                        )
                    })
                }

            </Flickity>
        </div>
    )
}
