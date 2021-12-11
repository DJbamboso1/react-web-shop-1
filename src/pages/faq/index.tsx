import { useTranslate } from 'core'
import React from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
const FAQ: React.FC = () => {
    let { t } = useTranslate()

    function handleToggle(event: any) {
        event.preventDefault()
        let id = event.currentTarget.getAttribute('href')
        document.querySelector(`.list-group-item .collapse${id}`)?.classList.toggle('show')
    }
    return (
        <div>
            <Breadcrumbs list={[
                {
                    title: 'Home',
                    link: '/',

                },
                {
                    title: `FAQ`,
                    link: ''
                }
            ]} />
            {/* CONTENT */}
            <section className="pt-7 pb-12">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            
                            <h3 className="mb-10 text-center" >{t('Frequently Asked Questions')}</h3>
                            
                            <h5 className="mb-7" style={{ fontWeight: 'bold' }}>{t('My Account')}:</h5>
                            
                            <ul className="list-group list-group-flush-x mb-9" id="faqCollapseParentOne">
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseOne" onClick={handleToggle}>
                                        1. {t('How to change password in Gecko ?')}                                    </a>
                                    
                                    <div className="collapse " id="faqCollapseOne" data-parent="#faqCollapseParentOne">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('You can change the password for your account by logging in to the account management page and following these steps:')}<br /><br />
                                                1. {t("Go to the account information section")}<br />
                                                2. {t('Enter the current password and the password you want to change')}<br />
                                                3. {t('Click "Save"')}<br />
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseTwo" onClick={handleToggle}>
                                        2. {t('How do I retrieve my Gecko account password?')}
                                    </a>
                                    
                                    <div className="collapse " id="faqCollapseTwo" data-parent="#faqCollapseParentOne">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('You can recover your password by actively contacting the websites admin via email Gecko@hotmail.com')}<br /><br />
                                                {t('Please provide full information including: account name (username) and account registration email. After verifying your identity, you will receive an email containing your new password via Geckos email.')}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseThree" onClick={handleToggle}>
                                        3. {t('How do I activate my account?')}
                                    </a>
                                    
                                    <div className="collapse " id="faqCollapseThree" data-parent="#faqCollapseParentOne">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('You can activate your account by clicking on the verification link via email Gecko@hotmail.com')}<br />
                                                {t('After logging in with an activated account, please go to the account management page and follow these steps:')}<br /><br />
                                                1. {t('Go to the account information section')}<br/>
                                                2. {t('Enter your tax identification number and upload your business registration license in pdf or image format.')}<br/>
                                                3. {t('Click "Save"')}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseFour" onClick={handleToggle}>
                                        4. {t('Why should I register for an account at Gecko?')}
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseFour" data-parent="#faqCollapseParentOne">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('When you register for an account at Gecko, you will:')}<br/>
                                                - {t('Regularly updated with useful product information as well as information on promotions and discounts available at Gecko.com website.')}<br/>
                                                - {t('Easily track your order status when placing an order.')}<br/>
                                                - {t('Faster operation when placing the next orders. The system will automatically store and pre-fill your personal information for the following orders.')}<br/>
                                                - {t('Accumulate membership points and receive additional discounts when reaching each distributors milestone when making purchases.')}<br/>
                                                - {t('Gecko regularly has preferential programs, exclusively for customers who have registered an account at Gecko.com website')}<br/>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            
                            <h5 className="mb-7" style={{ fontWeight: 'bold' }}>{t('Order and payment')}</h5>
                            
                            <ul className="list-group list-group-flush-x mb-9" id="faqCollapseParentTwo">
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseFive" onClick={handleToggle}>
                                        1. {t('How do I order through the Gecko website ?')}
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseFive" data-parent="#faqCollapseParentTwo">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('You can order online at Gecko website through basic ordering steps.')}
                                                {t('Please refer to the detailed information on each step of ordering as follows:')}<br/>
                                                <span style={{fontWeight: 'bold'}}>1. {t('Login to your account at Gecko')}</span><br/>
                                                {t('Please login with your existing Gecko account. In case you have not registered for an account, you can choose the line “Create an account” to register an account at Gecko.')}
                                                {t('Once done, you can click on the word “Create Account” to complete the registration process.')}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseSix" onClick={handleToggle}>
                                        2. {t('Search product')}
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseSix" data-parent="#faqCollapseParentTwo">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('You can find products in 3 ways:')}<br/>
                                                - {t('Type the product name in the search bar.')}<br/>
                                                - {t('Search by category.')}<br/>
                                                - {t('"Search by latest products, best sellers or popular categories in each category.')}<br/>
                                            </p>

                                        </div>
                                    </div>
                                </li>
                                {/* <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseSeven" onClick={handleToggle}>
                                        3. {t('Add products to cart:')}
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseSeven" data-parent="#faqCollapseParentTwo">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                {t('When you have found the product you like, please click on the image or product name to go to the product\'s detailed information page, then:')}<br/>
                                                - {t('Check product information: price, promotion information.')}<br/>
                                                - {t('Select the desired quantity.')}<br/>
                                                - {t('Add product to cart.')}<br/>
                                                {t('Once you have added the first product to the order, please follow these steps to add other products to the cart:')}<br/>
                                                - {t('Click on the Gecko logo to return to the homepage or type product search in the toolbar.')}
                                                - {t('Add products to cart by selecting products and clicking “Add to Cart”.')}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseEight" onClick={handleToggle}>
                                        4. Divide called which created was?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseEight" data-parent="#faqCollapseParentTwo">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseNine" onClick={handleToggle}>
                                        5. Land had man doesn't the very a doesn't?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseNine" data-parent="#faqCollapseParentTwo">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                            
                            {/* <h5 className="mb-7">Payment:</h5>
                            
                            <ul className="list-group list-group-flush-x" id="faqCollapseParentThree">
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseTen" onClick={handleToggle}>
                                        1. Above beginning won't over?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseTen" data-parent="#faqCollapseParentThree">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseEleven" onClick={handleToggle}>
                                        2. Good gathering image called, fifth good?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseEleven" data-parent="#faqCollapseParentThree">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseTwelve" onClick={handleToggle}>
                                        3. Fly beast days dominion firmament?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseTwelve" data-parent="#faqCollapseParentThree">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    
                                    <a className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset" data-toggle="collapse" href="#faqCollapseThirteen" onClick={handleToggle}>
                                        4. Fowl, given morning seed fruitful kind beast be?
                                    </a>
                                    
                                    <div className="collapse" id="faqCollapseThirteen" data-parent="#faqCollapseParentThree">
                                        <div className="mt-5">
                                            <p className="mb-0 font-size-lg text-gray-500">
                                                Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth
                                                hath rule creepeth own lesser years itself so seed fifth for grass.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FAQ
