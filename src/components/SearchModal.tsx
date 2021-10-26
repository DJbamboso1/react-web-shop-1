import { CategoryTree, PaginateData, Product01 } from '@types'
import { useForm } from 'core'
import { NONAME } from 'dns'
import { FilterQuery } from 'pages/product'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { productService } from 'services/productService'
import { StateStore } from 'store'
import { toggleSearch } from 'store/actions/searchAction'
import { convertQueryURLToObject, changeQueryURL } from 'utils'

type Form = {
    SearchValue: string
}

export const SearchModal: React.FC = () => {
    let { openSearch } = useSelector((store: StateStore) => store.search)

    let [data, setData] = useState<PaginateData<Product01>>()

    let queryUrl = convertQueryURLToObject<FilterQuery>()
    let dispatch = useDispatch()
    let { register, form, handleSubmit, error } = useForm<Form>()

    let objectURL = convertQueryURLToObject()

    let [searchVal, setSearchVal] = useState({})

    console.log('objectUrl: ', objectURL)

    useEffect(() => {
        if (openSearch) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
    }, [openSearch])

    useEffect(() => {

        (async () => {
            let list = await productService.paginate(searchVal)
            setData(list)
        })()
        // dispatch(fetchProductsAction(queryUrl))
        // setData(product.products)
    }, [searchVal])

    const submit = (form: Form) => {
        setSearchVal(form)
    }

    console.log('SEARCH: ', searchVal)
    console.log('LIST SEARCH PRODUCT: ', data)

    return ReactDOM.createPortal(
        <div onClick={(ev) => { dispatch(toggleSearch(false)) }} className={`modal fixed-right fade ${openSearch ? 'show' : ''}`} style={{ display: openSearch ? 'block' : 'none' }} id="modalSearch" tabIndex={-1} role="dialog" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-vertical" onClick={ev => ev.stopPropagation()} role="document">
                <div className="modal-content">
                    {/* Close */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* Header*/}
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Search Products</strong>
                    </div>
                    {/* Body: Form */}
                    <div className="modal-body">
                        <form onChange={handleSubmit(submit)}>
                            {/* <div className="form-group">
                                <label className="sr-only" htmlFor="modalSearchCategories">Categories:</label>
                                <select className="custom-select" id="modalSearchCategories">
                                    <option selected>All Categories</option>
                                    <option>Women</option>
                                    <option>Men</option>
                                    <option>Kids</option>
                                </select>
                            </div> */}
                            <div className="input-group input-group-merge">
                                <input className="form-control" type="search" placeholder="Search" {...register('SearchValue')} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-border" type="submit" >
                                        <i className="fe fe-search" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Body: Results (add `.d-none` to disable it) */}
                    <div className="modal-body border-top font-size-sm" >
                        {/* Heading */}
                        <p>Search Results:</p>
                        {/* Items */}

                        {
                            data && data.data.length > 0 ? data.data.map(pro => {
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
                                                <Link className="stretched-link text-body" to={`/product/${pro.id}`} onClick={(ev) => { dispatch(toggleSearch(false)) }}>{pro.name} ({pro.listPrice[0].volume})</Link> <br />
                                                <span className="text-muted">{pro.listPrice[0].value}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }) : <div className=" modal-body">
                                {/* Text */}
                                <p className="mb-3 font-size-sm text-center">
                                    Nothing matches your search
                                </p>
                                <p className="mb-0 font-size-sm text-center">
                                    😞
                                </p>
                            </div>
                        }

                        {/* Button */}
                        <Link className="btn btn-link px-0 text-reset" to="/product" onClick={(ev) => { dispatch(toggleSearch(false)) }}>
                            View All <i className="fe fe-arrow-right ml-2" />
                        </Link>
                    </div>
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