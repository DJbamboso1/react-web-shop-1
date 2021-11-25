import { Banner } from '../../../@types'
import LoadingPage from '../../../components/LoadingPage'
import { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import bannerService from '../../../services/bannerService'
import { changeQueryURL, convertQueryURLToObject } from "../../../utils"

interface SliderProp extends React.HTMLAttributes<HTMLDivElement> {
}

export const SliderDis: React.FC<SliderProp> = ({ ...ref }) => {
    // useEffect(() => {
    //     (window as any).$('.flickity-page-dots-inner').flickity({
    //         pageDots: true
    //     })
    // }, [])
    let queryUrl = convertQueryURLToObject()
    let [loading, setLoading] = useState(true)
    let [banner, setBanner] = useState<Banner['data']>()
    // console.log('SLIDER HERE: WHERE IS QUERY URL ? : ', queryUrl.DistributorId)
    useEffect(() => {
        (async () => {
            // if (queryUrl.DistributorId?.length) {
            let data = await bannerService.getBanner(queryUrl.DistributorId)
            if (data.succeeded === true) {
                setBanner(data.data)
            } 
            setLoading(false)
            // }
        })()
    }, [])

    // console.log('BANNER: ', banner)
    return (
        <>
            {
                !loading ? (
                    <>
                        {
                            banner && <Flickity
                                className="flickity-page-dots-inner mb-9"
                                options={{
                                    pageDots: true,
                                    autoPlay: true,
                                    wrapAround: true,
                                }}
                            // elementType={'div'} // default 'div'
                            // disableImagesLoaded={false} // default false
                            // reloadOnUpdate // default false
                            // static // default false
                            >
                                {
                                    banner?.map(b => {
                                        return (
                                            <div className="w-100">
                                                <a className="card bg-h-100 " style={{ backgroundImage: `url(${b.image})` }} href={b.link}>
                                                    <div className="row" style={{ minHeight: '400px' }}>
                                                        {/* <div className="col-12 col-md-10 col-lg-8 col-xl-6 align-self-center">
                                                    <div className="card-body px-md-10 py-11">

                                                        <h4>
                                                            2019 Summer Collection
                                                        </h4>

                                                        <a className="btn btn-link px-0 text-body" href="shop.html">
                                                            View Collection <i className="fe fe-arrow-right ml-2" />
                                                        </a>
                                                    </div>
                                                </div> */}
                                                        {/* <div className="col-12 col-md-2 col-lg-4 col-xl-6 d-none d-md-block bg-cover" style={{ backgroundImage: 'url(/img/covers/cover-16.jpg)' }} /> */}
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    })
                                }

                            </Flickity>
                        }
                    </>
                ) :
                    <LoadingPage />
            }
        </>
    )
}
