import { Breadcrumbs } from 'components/Breadcrumbs'
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
    let [status, setStatus] = useState(-2)
    let [date, setDate] = useState<{ date: Date }>()
    let [state, setState] = useState<StateProp>({
        loading: true,
        sessions: []
    })

    let queryUrl = convertQueryURLToObject<FilterQuery>()
    useEffect(() => {
        (async () => {
            if (user) {
                let pageNum = queryUrl.PageNumber || '1'
                let obj: FilterQuery = {
                    RetailerId: user.actorId,
                    PageNumber: pageNum,
                    PageSize: '3'
                }
                let sess = await sessionService.getAllSession(obj)
                setSession(sess)
                // console.log('STATUS: ', status)
                if (status > -2) {
                    let sessFilterStatus = sess.data.filter(s => s.status === status)
                    setState({
                        loading: false,
                        sessions: sessFilterStatus
                    })
                } else {
                    setState({
                        loading: false,
                        sessions: sess.data
                    })
                }

            }
        })()
    }, [queryUrl.PageNumber, status])


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
            <Breadcrumbs list={[
                {
                    title: 'Home',
                    link: '/'
                },
                {
                    title: 'Session',
                    link: '/account/session'
                },

            ]} />
            <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0px' }}>
                <form >
                    {/* Select */}
                    Trạng thái: <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }} onChange={(ev) => { setStatus(parseInt(ev.currentTarget.value)) }} >
                        <option value="-1">Đang thành tiền</option>
                        <option value="0">Đã hủy</option>
                        <option value="1">Đã thành tiền</option>
                        <option value="2">Chưa tính tiền</option>
                    </select>
                </form>
            </div>
            {/* <div className="">
                        <select className="custom-select custom-select-sm" id="status" style={{ width: 200, }}  >
                            <option value="-1">Đang thành tiền</option>
                            <option value="0">Đã hủy</option>
                            <option value="1">Đã thành tiền</option>
                            <option value="2">Chưa tính tiền</option>
                        </select>
                    </div> */}


            <div className="card card-lg mb-5 border">
                {
                    state.sessions && state.sessions.length > 0 ? state.sessions.map((s, i) => {
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
                                                    {i + 1}
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
                    }) : <p style={{ color: 'red' }}>Session is empty, want to buy some product ? <Link to='/'>Click here</Link></p>
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