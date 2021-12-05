import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { StateStore } from 'store'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'

const MainLayout: React.FC = ({ children }) => {
    function hoverEvent(event: any) {
        event.currentTarget.classList.add('hovered', 'show')
        document.querySelectorAll(".dropdown-toggle, dropdown-menu").forEach(e => {
            e.setAttribute("aria-expaned", 'true')
        })
        document.querySelectorAll(".dropdown-menu").forEach(e => {
            e.classList.add('show') 
        })

    };
    function mouseLeaveEvent(event: any) {
        event.currentTarget.classList.remove('show')
        document.querySelectorAll(".dropdown-menu, dropdown-menu").forEach(e => {
            e.classList.remove('show')
        })
    }
    window.addEventListener('scroll', function () {
        let $header = document.querySelector('#header')
        let scrollTop = document.documentElement.scrollTop
        if ($header) {
            // console.log($header?.scrollHeight)
            // let height = $header?.scrollHeight || 0
            let height = 90
            if (scrollTop > height) {
                $header.classList.add('fixed')
            } else {
                $header.classList.remove('fixed')
            }
        }
    })

    // let { login , role } = useSelector((store: StateStore) => store.auth)
    // if (login && role === 'Retailer') {
    //     return <Redirect to='/product' />
    // }

    return (
        <>
            <div id='header' style={{position: 'fixed' , width: '100%', zIndex: 1000 }}>
                <Header hoverEvent={hoverEvent} mouseLeaveEvent={mouseLeaveEvent} />
                <Navbar hoverEvent={hoverEvent} mouseLeaveEvent={mouseLeaveEvent} />
                {/* <Header  />
                <Navbar /> */}
            </div>
            <div style={{ paddingTop: '150px' }}>
                {children}
            </div>

            <Footer />
        </>
    )
}

export default MainLayout
