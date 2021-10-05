import React from 'react'

export const Header: React.FC = () => {
    return (
        <div className="row align-items-center mb-7">
            <div className="col-12 col-md">
                {/* Heading */}
                <h3 className="mb-1">Womens' Clothing</h3>
                {/* Breadcrumb */}
                <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                    <li className="breadcrumb-item">
                        <a className="text-gray-400" href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                        Women's Clothing
                    </li>
                </ol>
            </div>
            <div className="col-12 col-md-auto">
                {/* Select */}
                <select className="custom-select custom-select-xs">
                    <option selected>Most popular</option>
                </select>
            </div>
        </div>
    )
}
