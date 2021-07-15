import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.styles.scss'

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="nav-menu">
                    <Link to="/looseleaf" className="nav-link">Loose Leaf</Link>
                </div>
                <div className="nav-menu">
                    <Link to="" className="nav-link">Teabags</Link>
                </div>
                <div className="nav-menu">
                    <Link to="/" className="nav-link logo">
                        TEA IN BOX
                    </Link>
                </div>
                <div className="nav-menu">
                    <Link to="#" className="nav-link">Teawear</Link>
                </div>
                <div className="nav-menu">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
