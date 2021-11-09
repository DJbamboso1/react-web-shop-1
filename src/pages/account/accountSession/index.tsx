import LoadingPage from 'components/LoadingPage'
import { Paginate } from 'components/Paginate'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertQueryURLToObject, currency } from 'utils'
import { Session } from '../../../@types'
import { sessionService } from '../../../services/sessionService'
import { StateStore } from "../../../store"

type FilterQuery = {
    // page: string,
    RetailerId?: string
    PaymentMethodId?: string
    PageNumber?: string
    PageSize?: string
}

type StateProp = {
    loading: boolean,
    sessions: Session['data'],
}

const AccountSession: React.FC = () => {
    let { user } = useSelector((store: StateStore) => store.auth)
    let [session, setSession] = useState<Session>()

    let [state, setState] = useState<StateProp>({
        loading: true,
        sessions: []
    })

    let queryUrl = convertQueryURLToObject<FilterQuery>()
    useEffect(() => {
        (async () => {
            if (user?.data) {
                let pageNum = queryUrl.PageNumber || '1'
                let obj: FilterQuery = {
                    RetailerId: user.data.actorId,
                    PageNumber: pageNum,
                    PageSize: '3'
                }
                let sess = await sessionService.getAllSession(obj)
                setSession(sess)
                setState({
                    loading: false,
                    sessions: sess.data
                })
            }
        })()
    }, [queryUrl.PageNumber])


    const total = session?.total as number
    const pageSize = session?.pageSize as number
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
        pageNumber.push(i)
    }

    if (state.loading) {
        // setState({
        //     loading: true,
        //     sessions: []
        // })
        return <LoadingPage />
    }

    return (
        <div>
            <div className="card card-lg mb-5 border">
                {
                    state.sessions && state.sessions.map(s => {
                        return (
                            <Link style={{ color: 'black' }} className="card-body" to={`/account/orders/${s.id}`}>
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
                                                    {s.status === -1 ? 'Đang thành tiền' : (s.status === 0 ? 'Hủy' : (s.status === 1 ? 'Đã thành tiền' : (s.status === 2 ? 'Chưa thành tiền' : '')))}
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
            {
                state.sessions && session && <Paginate currentPage={session.pageNumber} totalPage={pageNumber.length} />
            }
        </div>
    )
}

export default AccountSession