import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import { useTranslate } from 'core';

function Footer() {
  let { t } = useTranslate()
  return (
    <footer className="bg-dark bg-cover @@classList" style={{ backgroundImage: 'url(/img/patterns/pattern-2.svg)' }}>
      <div className="py-12 border-gray-700 border-bottom " style={{ borderBottomWidth: '1px ' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              {/* Heading */}
              <h5 className="mb-7 text-center text-white">{t('Want more information about us ?')}</h5>
              {/* Form */}
              <form className="mb-11">
                <div className="form-row align-items-start">
                  <div className="col">
                    <input type="email" className="form-control form-control-gray-700 form-control-lg" placeholder="Enter Email *" />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-gray-500 btn-lg">{t('Subscribe')}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-3">
              {/* Heading */}
              <h4 className="mb-6 text-white">
                <img className='icon-img' src="/img/icons/LOGO3.png" alt="" />
              </h4>
              {/* Social */}
              <ul className="list-unstyled list-inline mb-7 mb-md-0">
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350" onClick={(ev) => { ev.preventDefault() }}>
                    <FacebookIcon />
                  </a>
                </li>
                {/* <li className="list-inline-item">
                    <a href="#!" className="text-gray-350">
                      <i className="fab fa-youtube" />
                    </a>
                  </li> */}
                <li className="list-inline-item" onClick={(ev) => { ev.preventDefault() }}>
                  <a href="#!" className="text-gray-350">
                    <TwitterIcon />
                  </a>
                </li>
                <li className="list-inline-item" onClick={(ev) => { ev.preventDefault() }}>
                  <a href="#!" className="text-gray-350">
                    <InstagramIcon />
                  </a>
                </li>
                {/* <li className="list-inline-item">
                    <a href="#!" className="text-gray-350">
                      <i className="fab fa-medium" />
                    </a>
                  </li> */}
              </ul>
            </div>
            <div className="col-6 col-sm"></div>
            <div className="col-6 col-sm"></div>
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">
                {t('Support')}
              </h6>
              {/* Links */}
              <ul className="list-unstyled mb-7 mb-sm-0">
                <li>
                  <a className="text-gray-300" href="/contact-us">{t('Contact Us')}</a>
                </li>
                <li>
                  <a className="text-gray-300" href="/faq.html">FAQs</a>
                </li>
                {/* <li>
                    <a className="text-gray-300" data-toggle="modal" href="#modalSizeChart">Size Guide</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="./shipping-and-returns.html">Shipping &amp; Returns</a>
                  </li> */}
              </ul>
            </div>
            {/* <div className="col-6 col-sm">
                
                <h6 className="heading-xxs mb-4 text-white">
                  Shop
                </h6>
                
                <ul className="list-unstyled mb-7 mb-sm-0">
                  <li>
                    <a className="text-gray-300" href="./shop.html">Men's Shopping</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="./shop.html">Women's Shopping</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="./shop.html">Kids' Shopping</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="./shop.html">Discounts</a>
                  </li>
                </ul>
              </div> */}
            {/* <div className="col-6 col-sm">
               
                <h6 className="heading-xxs mb-4 text-white">
                  Company
                </h6>
                
                <ul className="list-unstyled mb-0">
                  <li>
                    <a className="text-gray-300" href="./about.html">Our Story</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="#!">Careers</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="#!">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a className="text-gray-300" href="#!">Privacy &amp; Cookie policy</a>
                  </li>
                </ul>
              </div> */}
            <div className="col-6 col-sm">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">
                Contact
              </h6>
              {/* Links */}
              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-gray-300" href="#!">1-202-555-0105</a>
                </li>
                <li>
                  <a className="text-gray-300" href="#!">1-202-555-0106</a>
                </li>
                <li>
                  <a className="text-gray-300" href="#!">Gecko@hotmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Copyright */}
              <p className="mb-3 mb-md-0 font-size-xxs text-muted">
                © 2021 Gecko.
              </p>
            </div>
            <div className="col-auto">
              {/* Payment methods */}

            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer
