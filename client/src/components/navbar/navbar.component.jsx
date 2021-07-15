import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {logoutUser} from '../../redux/user/user.actions'
import './navbar.styles.scss'

const Navbar = ({ user: { isAuthenticated, loading } , logoutUser }) => {
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
                {!loading && isAuthenticated ? (<div className="nav-menu">
                    <Link onClick={logoutUser} to="#!" className="nav-link">Logout</Link>
                </div>) : (<div className="nav-menu">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>)}

            </nav>
        </>
    )
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps , {logoutUser})(Navbar)
