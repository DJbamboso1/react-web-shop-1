import { Skeleton } from "@mui/material"
import { CategoryTree } from "@types"
import { useEffect, useState } from "react"
import { convertQueryURLToObject } from "utils"
import cateService from '../../../services/cateService'
import { categoryConfig } from "../categoryConfig"



export const Filter: React.FC<any> = ({ cateData }) => {

   
    // let queryUrl = convertQueryURLToObject()
    // console.log('cateData: ' , cateData)

    console.log('cateData: ', cateData)

    return (
        <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}
            <form className="mb-10 mb-md-0">
                <ul className="nav nav-vertical" id="filterNav">
                    {cateData ? categoryConfig(cateData) : <Skeleton variant="rectangular"  height={600}/>}                  
                </ul>
            </form>
        </div>
    )
}
