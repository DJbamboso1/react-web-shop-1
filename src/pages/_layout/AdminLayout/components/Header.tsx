import React from 'react'
import MenuIcon from "../img/menu.svg";
import Logout from "../img/logout.svg";
import './Header.css'

function Header(props: any) {

    return (
        <div className="header">
            <img id="showMenu" src={MenuIcon} onClick={props.setIsOpen} />
            <h2>{window.location.pathname.split('/')[1]}</h2>
            <div className="logout">
                <img src={Logout} />
            </div>
        </div>
    )
}

export default Header
