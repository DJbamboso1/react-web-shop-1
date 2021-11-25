import { Skeleton } from "@mui/material"
import { CategoryTree } from "@types"
import { useEffect, useState } from "react"
import { changeQueryURL, convertQueryURLToObject } from "utils"
import cateService from '../../../services/cateService'
import { categoryConfig } from "../categoryConfig"
import { Categories, Distributor, PaginateData, Product, Product01, User } from '@types'
import { Link } from "react-router-dom"
import authService from "services/authService"
import distributorService from "services/distributorService"


export const Filter: React.FC<{ cateData: any }> = ({ cateData }) => {
    // console.log('DISTRIBUTORRRRRRRRR: ', cateDisData)
    let objectURL = convertQueryURLToObject()
    let [cateDisData, setCateDisData] = useState<Distributor<User>>()


    useEffect(() => {
        (async () => {
            let cateDis = await distributorService.getDistributor()

            if (cateDis) {
                for (let i = 0; i < cateDis.data.length; i++) {
                    let userId = '';
                    userId = cateDis.data[i]?.userId
                    let user = await authService.getInfo(userId)
                    // cateDisData.data[i].user = user
                    cateDis.data[i].displayName = user.data.displayName
                }
            }
            setCateDisData(cateDis)
        })()

    }, [])


    return (
        <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}
            <div className='cateScroll'>
                <h4 className='border-bottom' style={{ padding: 10, textAlign: 'center' }}>Ngành hàng</h4>
                <form className="mb-10 mb-md-0">
                    <ul className="nav nav-vertical" id="filterNav">
                        {cateData && categoryConfig(cateData)} {/* : <Skeleton variant="rectangular" height={600} /> */}
                    </ul>
                </form>
            </div>
            <div className='cateScroll'>
                <h4 className='border-bottom' style={{ padding: '30px 10px 10px 10px', textAlign: 'center' }}>Nhà phân phối</h4>
                <form className="mb-10 mb-md-0">
                    <ul className="nav nav-vertical" id="filterNav">
                        {cateDisData?.data ? cateDisData.data.map(disData => {
                            return (
                                <li className="nav-item">
                                    <Link className="nav-link  font-size-lg text-reset border-bottom " data-toggle="collapse" to={changeQueryURL({ ...objectURL, DistributorId: disData.id, CategoryId: '', SubCategoryId: '' })} >
                                        {disData.displayName}
                                    </Link>
                                </li>
                            )
                        }) : <Skeleton variant="rectangular" height={600} />}
                    </ul>
                </form>

            </div>
        </div>
    )
}
