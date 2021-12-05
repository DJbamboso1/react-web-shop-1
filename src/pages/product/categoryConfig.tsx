import { stringify } from "querystring";
import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { changeQueryURL, convertQueryURLToObject } from "utils";
import { FilterQuery } from ".";
import { CategoryTree } from "../../@types/CategoryTree";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function categoryConfig(categories: CategoryTree[]) {
    // let queryUrl = convertQueryURLToObject()
    console.log('categories: ', categories)
    let objectURL = convertQueryURLToObject()
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
    // return categories.map(cate => {
    //     return (
    //         <li className="nav-item">
    //             {/* Toggle */}
    //             <Link className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6" data-toggle="collapse" to={changeQueryURL({ ...objectURL, CategoryId: cate.id })} onClick={(e) => _onClickHandle(e, cate.name)}>
    //                 {cate.name}
    //             </Link>
    //         </li>
    //     )
    // })
    let list: any = []
    if ((categories?.length || 0) > 0) {
        categories.map((cate) => {
            return (
                list.push(
                    <li className="nav-item">
                        {/* Toggle */}
                        <Link className="nav-link font-size-lg text-reset border-bottom category-link" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} data-toggle="collapse" to={changeQueryURL({ ...objectURL, CategoryId: cate.id, SubCategoryId: '', PageNumber: 1 })} onClick={(e) => _onClickHandle(e, cate.name)}>
                            {cate.name}
                            <KeyboardArrowDownIcon/>
                        </Link>

                        {cate.subCategories && cate.subCategories?.length > 0 && (
                            <div className="collapse" id={cate.name}>
                                <div className="form-group">
                                    <ul className="list-styled mb-0" id="productsNav">
                                        {cate.subCategories.map((child: CategoryTree) => {

                                            return (
                                                <li className="list-styled-item">
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
            )
        })

    }

    return list
}