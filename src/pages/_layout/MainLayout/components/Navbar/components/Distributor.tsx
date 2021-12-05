import Flickity from 'react-flickity-component'
import React, { useEffect, useState } from 'react'
import { Distributor, User } from '../../../../../../@types'
import distributorService from '../../../../../../services/distributorService'
import authService from '../../../../../../services/authService'
import { Link } from 'react-router-dom'

const DistributorComponent: React.FC = () => {
    let [distributor, setDistributor] = useState<Distributor<User['data']>>()
    useEffect(() => {
        (async () => {
            let cateDis = await distributorService.getDistributor({ IsActive: true })

            if (cateDis) {
                for (let i = 0; i < cateDis.data.length; i++) {
                    let userId = '';
                    userId = cateDis.data[i].user?.id || ''
                    let user = await authService.getInfo(userId)
                    // cateDisData.data[i].user = user
                    cateDis.data[i].displayName = user.data.displayName
                }
            }
            setDistributor(cateDis)
        })()
    }, [])

    return (
        <div className="card card-lg">
            <div className="card-body">
                <ul className="list-styled font-size-sm">
                    {
                        distributor && distributor.data && distributor.data.map(dis => {
                            return (
                                <li className="list-styled-item">
                                    <Link className="list-styled-link" to={`/?DistributorId=${dis.id}`}>{dis.user?.displayName}</Link>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
        </div>
    )
}

export default DistributorComponent
