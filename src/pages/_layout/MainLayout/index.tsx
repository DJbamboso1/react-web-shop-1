import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'

const MainLayout: React.FC = ({ children }) => {
    function hoverEvent(event: any) {

        // dropdown.current.classList.add('show','hovered')
        // event.preventDefault()
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
            console.log($header?.scrollHeight)
            let height = $header?.scrollHeight || 0
            
            if (scrollTop > height) {
                $header.classList.add('fixed')
            } else {
                $header.classList.remove('fixed')
            }
        }
    })

    return (
        <>
            <div id='header' style={{position: 'fixed' , width: '100%', zIndex: 1000 }}>
                {/* <Header hoverEvent={hoverEvent} mouseLeaveEvent={mouseLeaveEvent} /> */}
                <Navbar hoverEvent={hoverEvent} mouseLeaveEvent={mouseLeaveEvent} />
            </div>
            <div style={{ paddingTop: '100px' }}>
                {children}
            </div>

            <Footer />
        </>
    )
}

export default MainLayout
