import { Skeleton } from "@mui/material"
import { CategoryTree } from "@types"
import { useEffect, useState } from "react"
import { convertQueryURLToObject } from "utils"
import cateService from '../../../services/cateService'
import { categoryConfig } from "../categoryConfig"
import { Categories, Distributor, PaginateData, Product, Product01, User } from '@types'
import { Link } from "react-router-dom"
import authService from "services/authService"


export const Filter: React.FC<{ cateData: any, cateDisData?: Distributor<User> }> = ({ cateData, cateDisData }) => {
    console.log('DISTRIBUTORRRRRRRRR: ', cateDisData)

    // let queryUrl = convertQueryURLToObject()
    // console.log('cateData: ' , cateData)

    // console.log('cateData: ', cateData)
    // console.log('IDDDDDDDDDDD: ', cateDisData?.data[0]?.userId)

    

    // console.log(cateDisData)
    return (
        <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}

            <h4 className='border-bottom' style={{ padding: 10, textAlign: 'center' }}>Categories</h4>
            <form className="mb-10 mb-md-0">
                <ul className="nav nav-vertical" id="filterNav">
                    {cateData ? categoryConfig(cateData) : <Skeleton variant="rectangular" height={600} />}
                </ul>
            </form>



            <h4 className='border-bottom' style={{ padding: '30px 10px 10px 10px', textAlign: 'center' }}>Categories</h4>
            <form className="mb-10 mb-md-0">
                <ul className="nav nav-vertical" id="filterNav">
                    {cateDisData?.data ? cateDisData.data.map(disData => {
                        return (
                            <li className="nav-item">
                                <Link className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6" data-toggle="collapse" to=''>
                                    {/* {disData && disData.user && disData.user.data && disData.user.data?.displayName} */}
                                    {disData.displayName }
                                </Link>
                            </li>
                        )
                    }) : <Skeleton variant="rectangular" height={600} />}
                </ul>
            </form>

        </div>
    )
}
