import { useTranslate } from 'core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StateStore } from 'store'
import { toggleCart } from 'store/actions/cartAction'
import { toggleSearch } from 'store/actions/searchAction'
import { useCartNumber } from 'store/selector'
import Blog from './components/Blog'
import CatalogCard from './components/CatalogCard'
import Categories from './components/Categories'
import Pages from './components/Pages'
import Shop from './components/Shop'
// import firebase from 'firebase/app';
import firebase from '../../../../../utils/firebase'
import DistributorComponent from './components/Distributor'
// import {requestPermission, M} from 'firebase/app'

type NavbarProp = {
    hoverEvent: React.MouseEventHandler<HTMLElement>,
    mouseLeaveEvent: React.MouseEventHandler<HTMLElement>
}

const Navbar: React.FC<NavbarProp> = ({ hoverEvent, mouseLeaveEvent }) => {

    let { login } = useSelector((store: StateStore) => store.auth)
    let { list } = useSelector((store: StateStore) => store.cart)

    const { t } = useTranslate()
    const dispatch = useDispatch()

    let num = useCartNumber()

    function _openCartModal(ev: React.MouseEvent) {
        ev.preventDefault()
        ev.currentTarget.querySelector('')
        dispatch(toggleCart(true))

    }

    function _openSearchModal(ev: React.MouseEvent) {
        ev.preventDefault()
        dispatch(toggleSearch(true))
    }

    function _handleMenuToggle(ev: React.MouseEvent) {
        ev.preventDefault()
        document.querySelector('.container #navbarCollapse1')?.classList.toggle('show')
    }

    // React.useEffect(() => {
    //     const msg = firebase.messaging();
    //     msg.requestPermission().then(() => {
    //         return msg.getToken();
    //     }).then((data: any) => {
    //         console.log("token", msg)
    //     })
    // })

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white">

            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand" style={{ width: '200px' }} to="/" >
                    <img className='icon-img' src="/img/icons/LOGO3.png" alt="" />
                </Link>
                {/* Toggler */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" onClick={_handleMenuToggle}>
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Collapse */}
                <div className="collapse navbar-collapse" id="navbarCollapse1">
                    {/* Nav */}
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item dropdown hovered" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>

                            <Link className="nav-link" data-toggle="dropdown" to="/" aria-expanded="true">Categories</Link>

                            <div className="dropdown-menu">
                                <Categories />
                            </div>
                        </li>
                        <li className="nav-item dropdown hovered" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>

                            <Link className="nav-link" data-toggle="dropdown" to="/" aria-expanded="true">Distributor</Link>

                            <div className="dropdown-menu">
                                <DistributorComponent />
                            </div>
                        </li>
                        {/* <li className="nav-item dropdown position-static" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>
                            
                            <Link className="nav-link" data-toggle="dropdown" to="/">{t('Distributor')}</Link>
                            
                            <div className="dropdown-menu w-100">
                                <CatalogCard />
                            </div>
                        </li> */}
                        {/* <li className="nav-item dropdown" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>
                            
                            <Link className="nav-link" data-toggle="dropdown" to="#">Shop</Link>
                            
                            <div className="dropdown-menu" style={{ minWidth: '650px' }}>
                                <Shop />
                            </div>
                        </li>
                        <li className="nav-item dropdown hovered" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>
                            
                            <Link className="nav-link" data-toggle="dropdown" to="#" aria-expanded="true">Pages</Link>
                           
                            <div className="dropdown-menu">
                                <Pages />
                            </div>
                        </li>
                        <li className="nav-item dropdown hovered" onMouseOver={hoverEvent} onMouseLeave={mouseLeaveEvent}>
                            
                            <Link className="nav-link" data-toggle="dropdown" to="#" aria-expanded="true">Blog</Link>
                            
                            <div className="dropdown-menu">
                                <Blog />
                            </div>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="docs/getting-started.html">Docs</a>
                        </li> */}
                    </ul>
                    {/* Nav */}
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="modal" href="#" onClick={_openSearchModal}>
                                <i className="fe fe-search" />
                            </a>
                        </li>
                        <li className="nav-item ml-lg-n4">
                            {/* <Link className="nav-link" to="/account/info">
                                <i className="fe fe-user" />
                            </Link> */}
                            <Link className="nav-link" to={login ? '/account/info' : '/auth/login'}>
                                <i className="fe fe-user" />
                            </Link>
                        </li>
                        {/* <li className="nav-item ml-lg-n4">
                            <Link className="nav-link" to={login ? '/account/info' : '/auth/login'} >
                                <i className="fe fe-heart" />
                            </Link>
                        </li> */}
                        <li className="nav-item ml-lg-n4">
                            <a className="nav-link" data-toggle="modal" href="#" onClick={_openCartModal}>
                                <span data-cart-items={list.length || undefined}>
                                    <i className="fe fe-shopping-cart" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
