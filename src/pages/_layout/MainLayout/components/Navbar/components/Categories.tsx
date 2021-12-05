import { CategoryAll } from '@types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cateService from 'services/cateService'

const Categories: React.FC = () => {
    let [category, setCategory] = useState<CategoryAll>()
    useEffect(() => {
        (async () => {
            let categories = await cateService.getCategory()
            if (categories) {
                setCategory(categories)
            }
        })()
    }, [])

    return (
        <div className="card card-lg">
            <div className="card-body">
                <ul className="list-styled font-size-sm">
                    {
                        category && category.data && category.data.map(cate => {
                            return (
                                <li className="list-styled-item">
                                    <Link className="list-styled-link" to={`/?CategoryId=${cate.id}`}>{cate.name}</Link>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
        </div>
    )
}

export default Categories
