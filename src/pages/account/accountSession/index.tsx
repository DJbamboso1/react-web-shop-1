import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { currency } from 'utils'
import { Session } from '../../../@types'
import { sessionService } from '../../../services/sessionService'
import { StateStore } from "../../../store"

type FilterQuery = {
    // page: string,
    RetailerId?: string
    PaymentMethodId?: string
}

type StateProp = {
    loading: boolean,
    session: Session,
  }

const AccountSession: React.FC = () => {
    let { user } = useSelector((store: StateStore) => store.auth)
    let [session, setSession] = useState<Session>()
    useEffect(() => {
        (async () => {
            if (user?.data) {
                let obj: FilterQuery = {
                    RetailerId: user.data.actorId
                }
                let sess = await sessionService.getAllSession(obj)
                setSession(sess)
            }
        })()
    }, [])

    return (
        <div>
            <div className="card card-lg mb-5 border">
                {
                    session && session.data.map(s => {
                        return (
                            <Link style={{color: 'black'}} className="card-body pb-0" to={`/account/orders/${s.id}`}>
                                {/* Info */}
                                <div className="card card-sm">
                                    <div className="card-body bg-light">
                                        <div className="row">
                                            <div className="col-6 col-lg-3">
                                                {/* Heading */}
                                                <h6 className="heading-xxxs text-muted">Session No:</h6>
                                                {/* Text */}
                                                <p className="mb-lg-0 font-size-sm font-weight-bold">
                                                    {s.id}
                                                </p>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                {/* Heading */}
                                                <h6 className="heading-xxxs text-muted">Created date:</h6>
                                                {/* Text */}
                                                <p className="mb-lg-0 font-size-sm font-weight-bold">
                                                    <time dateTime="2019-10-01">
                                                        {s.dateCreated}
                                                    </time>
                                                </p>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                {/* Heading */}
                                                <h6 className="heading-xxxs text-muted">Status:</h6>
                                                {/* Text */}
                                                <p className="mb-0 font-size-sm font-weight-bold">
                                                {s.status === -1 ? 'Đang thành tiền' : (s.status === 0 ? 'Hủy' : (s.status === 1 ? 'Đã thành tiền' : (s.status === 2 ? 'Chưa thành tiền' : ''))) }
                                                </p>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                {/* Heading */}
                                                <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                                                {/* Text */}
                                                <p className="mb-0 font-size-sm font-weight-bold">
                                                    {currency(s.totalCost)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
            {/* Pagination */}
            <nav className="d-flex justify-content-center justify-content-md-end mt-10">
                <ul className="pagination pagination-sm text-gray-400">
                    <li className="page-item">
                        <a className="page-link page-link-arrow" href="#">
                            <i className="fa fa-caret-left" />
                        </a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">4</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">5</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">6</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link page-link-arrow" href="#">
                            <i className="fa fa-caret-right" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AccountSession