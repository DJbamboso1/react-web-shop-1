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
import { useTranslate } from "core"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Filter: React.FC<{ cateData: any }> = ({ cateData }) => {
    // console.log('DISTRIBUTORRRRRRRRR: ', cateDisData)
    let objectURL = convertQueryURLToObject()
    let [cateDisData, setCateDisData] = useState<Distributor<User['data']>>()
    let { t } = useTranslate()
    
    let isDropdown: boolean
    // console.log('category: ', objectURL)
    function _onClickHandle(e: React.MouseEvent, id: string) {
        isDropdown = !isDropdown
        document.querySelectorAll(".nav-link.category-link").forEach(e => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.toggle('collapsed')
        e.currentTarget.classList.toggle('active')
        console.log('id: ', id)
        document.getElementById(`${id}`)?.classList.toggle('show')
        // if (objectURL.DistributorId) {
        //     document.querySelectorAll(".nav-link.category-link .colapse").forEach(e => {
        //         e.classList.remove('active')
        //     })
        // }
    }

    useEffect(() => {
        (async () => {
            if (objectURL.CategoryId || objectURL.SubCategoryId) {
                let cateDis = await distributorService.getDistributorByCate({ IsActive: true, CategoryId: objectURL.CategoryId, SubCategoryId: objectURL.SubCategoryId })
                // if (cateDis) {
                //     for (let i = 0; i < cateDis.data.length; i++) {
                //         let userId = '';
                //         userId = cateDis.data[i].user?.id || ''
                //         let user = await authService.getInfo(userId)
                //         // cateDisData.data[i].user = user
                //         cateDis.data[i].displayName = user.data.displayName
                //     }
                // }
                setCateDisData(cateDis)
            }
        })()

    }, [objectURL.CategoryId, objectURL.SubCategoryId])

    console.log('CATEDISDATA: ', cateDisData)

    function _handleActive(ev: any) {
        document.querySelectorAll('.cateScroll #filterNav1 .nav-item .nav-link').forEach(e => {
            e.classList.remove('active')
        })
        ev.currentTarget.classList.add('active')
    }


    return (
        <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}
            <div className='cateScroll'>
                <h4 className='border-bottom' style={{ padding: 25, textAlign: 'center', fontWeight: 'bold', fontSize: '15pt' }}>{t('Categories')}</h4>
                <form className="mb-10 mb-md-0 ">
                    <ul className="nav nav-vertical" id="filterNav">
                        {cateData && cateData.map((cate: any) => {
                            return (
                                <li className="nav-item">
                                    {/* Toggle */}
                                    <Link className="nav-link border-bottom category-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-toggle="collapse" to={changeQueryURL({ ...objectURL, CategoryId: cate.id, SubCategoryId: '', PageNumber: 1 })} onClick={(e) => _onClickHandle(e, cate.name)}>
                                        {cate.name}
                                        <KeyboardArrowDownIcon />
                                    </Link>
                                    {cate.subCategories && cate.subCategories?.length > 0 && (
                                        <div className="collapse" id={cate.name}>
                                            <div className="form-group">
                                                <ul className="list-styled mb-0" id="productsNav">
                                                    {cate.subCategories.map((child: CategoryTree) => {

                                                        return (
                                                            <li className="list-styled-item" id='list1'>
                                                                <Link className="list-styled-link" to={changeQueryURL({ ...objectURL, SubCategoryId: child.id, PageNumber: 1, CategoryId: cate.id })} >
                                                                    {child.name}
                                                                </Link>
                                                                {((child.subCategories?.length || 0) > 0) &&

                                                                    <div className="py-4 pl-4">
                                                                        {child.subCategories?.map(c => {
                                                                            return (
                                                                                <div className="custom-control custom-checkbox mb-3">
                                                                                    <input className="custom-control-input" id="dressesOne" type="checkbox" />
                                                                                    <label className="custom-control-label" htmlFor="dressesOne">
                                                                                        <Link style={{ color: '#525252' }} to={changeQueryURL({ ...objectURL, CategoryId: c.id, PageNumber: 1 })}>{c.name}</Link>
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })}

                                                                    </div>
                                                                }
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>

                            )
                        })} {/* : <Skeleton variant="rectangular" height={600} /> */}
                    </ul>
                </form>
            </div>
            {
                !objectURL.DistributorId && (objectURL.CategoryId || objectURL.SubCategoryId) &&
                <div className='cateScroll'>
                    <h4 className='border-bottom' style={{ padding: 25, textAlign: 'center', fontWeight: 'bold', fontSize: '15pt' }}>{t('Distributors')}</h4>
                    <form className="mb-10 mb-md-0 ">
                        <ul className="nav nav-vertical" id="filterNav1">
                            {cateDisData?.data ? cateDisData.data.map(disData => {
                                return (
                                    <li className="nav-item">
                                        <Link className="nav-link border-bottom " data-toggle="collapse" onClick={_handleActive} to={changeQueryURL({ ...objectURL, DistributorId: disData.id })} >
                                            {disData.user?.displayName}
                                        </Link>
                                    </li>
                                )
                            }) : <Skeleton variant="rectangular" height={600} />}
                        </ul>
                    </form>

                </div>
            }
        </div>
    )
}
