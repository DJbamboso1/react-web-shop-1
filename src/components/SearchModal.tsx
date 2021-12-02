import { CategoryTree, Distributor, PaginateData, Product01, User } from '@types'
import { history, useForm } from 'core'
import { NONAME } from 'dns'
import { FilterQuery } from 'pages/product'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import authService from 'services/authService'
import distributorService from 'services/distributorService'
import { productService } from 'services/productService'
import { StateStore } from 'store'
import { toggleSearch } from 'store/actions/searchAction'
import { convertQueryURLToObject, changeQueryURL } from 'utils'
import LoadingPage from './LoadingPage'

type Form = {
    SearchValue?: string,
    DistributorId?: string,
}

export const SearchModal: React.FC = () => {
    let { openSearch } = useSelector((store: StateStore) => store.search)
    let [data, setData] = useState<PaginateData<Product01>>()
    let queryUrl = convertQueryURLToObject<FilterQuery>()
    let dispatch = useDispatch()
    let { register, form, handleSubmit, error } = useForm<Form>()
    let objectURL = convertQueryURLToObject()
    let [searchVal, setSearchVal] = useState({})

    let [loading, setLoading] = useState(true)

    let [listDis, setListDis] = useState<Distributor<User['data']>>()
    // console.log('objectUrl: ', objectURL)

    useEffect(() => {
        if (openSearch) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
    }, [openSearch])

    useEffect(() => {
        setLoading(true)
        let timeout = setTimeout(() => {
            (async () => {
                let list = await productService.paginate(searchVal)
                setData(list)
                setLoading(false)
            })()

        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
        // dispatch(fetchProductsAction(queryUrl))
        // setData(product.products)
    }, [searchVal])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let distributors = await distributorService.getDistributor({IsActive: true})
            setListDis(distributors)
            setLoading(false)
        })()
    }, [])

    if (listDis) {
        for (let i = 0; i < listDis.data.length; i++) {
            let userId = '';
            // console.log(listDis)
            if (listDis) {
                // console.log(listDis?.data[i])
                if (listDis.data[i].user?.id)
                    userId = listDis.data[i].user?.id || ''
            }
            (async () => {
                let user = await authService.getInfo(userId)
                // cateDisData.data[i].user = user
                listDis.data[i].user = user['data']
            })()

        }
    }

    // console.log('LIST DIS: ', listDis)
    const submit = (form: Form) => {
        // history.push('/')
        // console.log('FORM:', form)
        // history.push('/')
        setSearchVal(form)
    }


    return ReactDOM.createPortal(
        <div onClick={(ev) => { dispatch(toggleSearch(false)) }} className={`modal fixed-right fade ${openSearch ? 'show' : ''}`} style={{ display: openSearch ? 'block' : 'none' }} id="modalSearch" tabIndex={-1} role="dialog" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-vertical" onClick={ev => ev.stopPropagation()} role="document">
                <div className="modal-content">
                    {/* Close */}

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* <Link type="submit" className="close" to={`//?DistributorId=${form.DistributorId || ''}&SearchValue=${form.SearchValue || ''}`} onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                        <i className="fe fe-x" aria-hidden="true" />
                    </Link> */}
                    {/* <Link className="btn btn-link px-0 text-reset" type="submit" to={`/?DistributorId=${form.DistributorId || ''}&SearchValue=${form.SearchValue || ''}`} onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                            Xem tất cả <i className="fe fe-arrow-right ml-2" />
                        </Link> */}
                    {/* Header*/}
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Tìm kiếm sản phẩm</strong>
                    </div>
                    {/* Body: Form */}
                    <form onChange={handleSubmit(submit)}>
                        <div className="modal-body">

                            <div className="form-group">
                                <label className="sr-only" htmlFor="modalSearchCategories">Nhà phân phối:</label>
                                <select className="custom-select" id="modalSearchCategories" {...register('DistributorId')}>
                                    <option selected value=''>Tất cả</option>
                                    {
                                        listDis && listDis.data && listDis.data.map(i => {
                                            return (
                                                <option value={i.id}>{i.user && i.user.displayName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-group input-group-merge">
                                <input className="form-control" type="search" placeholder="Tìm kiếm" {...register('SearchValue')} />
                                <div className="input-group-append">
                                    <Link to={`/?DistributorId=${form.DistributorId || ''}&SearchValue=${form.SearchValue || ''}`} className="btn btn-outline-border" type="submit" onClick={(ev) => { dispatch(toggleSearch(false)) }} >
                                        <i className="fe fe-search" />
                                    </Link>

                                </div>
                            </div>
                        </div>
                        {/* Body: Results (add `.d-none` to disable it) */}
                        <div className="modal-body border-top font-size-sm" >
                            {/* Heading */}
                            <p>Kết quả tìm kiếm:</p>
                            {/* Items */}

                            {
                                loading === false ? (data && data.data.length > 0 ? data.data.slice(0, 5).map(pro => {
                                    return (
                                        <div className="row align-items-center position-relative mb-5">
                                            <div className="col-4 col-md-3">
                                                {/* Image */}
                                                <Link to={`/product/${pro.id}`}>
                                                    <img className="img-fluid" src={pro.image} alt="..." onClick={(ev) => { dispatch(toggleSearch(false)) }} />
                                                </Link>

                                            </div>
                                            <div className="col position-static">
                                                {/* Text */}
                                                <p className="mb-0 font-weight-bold">
                                                    <Link className="stretched-link text-body" to={`/product/${pro.id}`} onClick={(ev) => { dispatch(toggleSearch(false)) }}>{pro.name} ({pro.listPrice && pro.listPrice[0].volume} vật phẩm)</Link> <br />
                                                    <span className="text-muted">
                                                        {
                                                            pro && pro.listPrice && ((pro.listPrice.length > 0) ?
                                                                `${pro.listPrice.length > 1 ? (pro.listPrice[pro.listPrice.length - 1].value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) + ' - ') : ''}${pro.listPrice[0].value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  `
                                                                : <h6 style={{ color: 'red' }}>Không giá</h6>)

                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }) : <div className=" modal-body">
                                    {/* Text */}
                                    <p className="mb-3 font-size-sm text-center">
                                        Không tìm thấy từ khóa
                                    </p>
                                    <p className="mb-0 font-size-sm text-center">
                                        😞
                                    </p>
                                </div>) : <LoadingPage />

                            }

                            {/* Button */}
                            <Link className="btn btn-link px-0 text-reset" type="submit" to={`/?DistributorId=${form.DistributorId || ''}&SearchValue=${form.SearchValue || ''}`} onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                                Xem tất cả <i className="fe fe-arrow-right ml-2" />
                            </Link>
                        </div>
                    </form>
                    {/* Body: Empty (remove `.d-none` to disable it) */}

                </div>
            </div>
            {
                openSearch && <BackDrop onClick={() => dispatch(toggleSearch(false))} />
            }
        </div>
        , document.body)

}

const BackDrop: React.FC<{
    onClick?: (ev: React.MouseEvent) => void
}> = ({ onClick }) => {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.modal-backdrop')?.classList.add('show')
        })
        return () => {
            document.querySelector('.modal-backdrop')?.classList.remove('show')
        }
    }, [])

    return ReactDOM.createPortal(<div onClick={onClick} className="modal-backdrop fade "></div>, document.body)
}