import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslate, translate } from "../../../../core/translate"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Header(props: any) {
    // console.log(dropdown)

    let { t, selectLang, language } = useTranslate()
    let lang = localStorage.getItem('lang')
    // console.log(selectLang)
    function _handleMenuToggle(ev: React.MouseEvent) {
        ev.preventDefault()
        document.querySelector('.container #topbarCollapse')?.classList.toggle('show')
    }

    function chagneLang(ev: any) {
        let value = ev.currentTarget.getAttribute('data-value')
        selectLang(value)
    }

    return (
        <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
            <div className="container">
                {/* Promo */}
                <div className="mr-xl-8">
                    <i className="fe fe-truck mr-2" /> <span className="heading-xxxs">{t('SHIPPING NATIONWIDE')}</span>
                </div>
                {/* Toggler */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topbarCollapse" aria-controls="topbarCollapse" aria-expanded="false" aria-label="Toggle navigation" onClick={_handleMenuToggle}>
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Collapse */}
                <div className=" navbar-collapse collapse" id="topbarCollapse">
                    {/* Nav */}
                    <ul className="nav nav-divided navbar-nav mr-auto">
                        <li className="nav-item dropdown" onMouseOver={props.hoverEvent} onMouseLeave={props.mouseLeaveEvent}>
                            
                            <Link className="nav-link" data-toggle="dropdown" to="/">
                                <img className="mb-1 mr-1" src="/img/icons/vietnam.png" alt="..." style={{width: '20px'}}/> Việt Nam
                            </Link>
                            
                            {/* <div className="dropdown-menu minw-0" >
                                <a className="dropdown-item" href="#">
                                    <img className="mb-1 mr-2" src="/img/flags/usa.svg" alt="USA" />United States
                                </a>
                                <a className="dropdown-item" href="#">
                                    <img className="mb-1 mr-2" src="/img/flags/canada.svg" alt="Canada" />Canada
                                </a>
                                <a className="dropdown-item" href="#">
                                    <img className="mb-1 mr-2" src="/img/flags/germany.svg" alt="Germany" />Germany
                                </a>
                            </div> */}
                        </li>
                        <li className="nav-item dropdown" onMouseOver={props.hoverEvent} onMouseLeave={props.mouseLeaveEvent}>
                            
                            <a className="nav-link " data-toggle="dropdown" href="#">VNĐ</a>
                            
                            {/* <div className="dropdown-menu minw-0">
                                <a className="dropdown-item" href="#!">USD</a>
                                <a className="dropdown-item" href="#!">VNĐ</a>
                            </div> */}
                        </li>
                        <li className="nav-item dropdown" onMouseOver={props.hoverEvent} onMouseLeave={props.mouseLeaveEvent}>
                            {/* Toggle */}
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" onClick={(ev) => {ev.preventDefault()}} href="#">{lang === 'en' ? 'English' : 'Tiếng Việt'}</a>
                            {/* Menu */}
                            <div className="dropdown-menu minw-0" >
                                <a className="dropdown-item" href="#" onClick={(ev: any) => {chagneLang(ev); ev.preventDefault()}} data-value='en'>English</a>
                                <a className="dropdown-item" href="#" onClick={(ev: any) => {chagneLang(ev); ev.preventDefault()}} data-value='vn'>Tiếng Việt</a>
                                {/* <a className="dropdown-item" href="#">German</a> */}
                            </div>
                            
                            {/* <div>{t('Hello')}</div> */}
                        </li>
                    </ul>
                    {/* <select name="" id=""
                        onChange={chagneLang}
                        defaultValue={language}
                    >
                        <option value="en">English</option>
                        <option value="vn">Tiếng Việt</option>
                    </select>
                    <div>{t('Hello')}</div> */}
                    {/* Nav */}
                    <ul className="nav navbar-nav mr-8">
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/shipping" >{t('Shipping')}</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/faq">FAQ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact-us" >{t('Contact')}</a>
                        </li>
                    </ul>
                    {/* Nav */}
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item">
                            <a className="nav-link text-gray-350" href="/" onClick={(ev) => {ev.preventDefault()}}>
                                {/* <i className="fa fa-facebook" /> */}
                                <FacebookIcon/>
                            </a>
                        </li>
                        <li className="nav-item ml-xl-n4">
                            <a className="nav-link text-gray-350" href="/" onClick={(ev) => {ev.preventDefault()}}>
                                {/* <i className="fab fa-twitter" /> */}
                                <TwitterIcon/>
                            </a>
                        </li>
                        <li className="nav-item ml-xl-n4">
                            <a className="nav-link text-gray-350" href="/" onClick={(ev) => {ev.preventDefault()}}>
                                {/* <i className="fab fa-instagram" /> */}
                                <InstagramIcon/>
                            </a>
                        </li>
                        {/* <li className="nav-item ml-xl-n4">
                            <a className="nav-link text-gray-350" href="#!">
                                <i className="fab fa-medium" />
                                
                            </a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
