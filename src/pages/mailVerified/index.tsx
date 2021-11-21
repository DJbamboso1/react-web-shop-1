import React from 'react'
import { Link } from 'react-router-dom'

const MailVerified: React.FC = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                    {/* Icon */}
                    <div className="mb-7 font-size-h1">{'❤️'}</div>
                    {/* Heading */}
                    <h2 className="mb-5">Congratulation</h2>
                    {/* Text */}
                    <p className="mb-7 text-gray-500">
                        Your account have been activated
                    </p>
                    <Link className="btn btn-dark" to='/auth/login'>
                        Back to login page
                    </Link>
                    {/* Button */}
                </div>
            </div>
        </div>
    )
}

export default MailVerified
