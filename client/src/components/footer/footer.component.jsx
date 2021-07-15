import React , {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterCircle,
    AiFillYoutube
  } from "react-icons/ai";

import './footer.styles.scss'

const Footer = () => {
    return (
        <Fragment>
            <div className="footer-container">
                <div className="contact-us-container">
                    <Link className="get-in-touch" to="/contact">Get in touch with us!</Link>
                    <div className="social-media-links">
                        <Link><AiFillFacebook className="social-icons"/></Link>
                        <Link><AiFillInstagram className="social-icons"/></Link>
                        <Link><AiFillTwitterCircle className="social-icons"/></Link>
                        <Link><AiFillYoutube className="social-icons"/></Link>
                    </div>
                </div>
                <div className="other-details-container">
                    <div className="about-container">
                    <Link className="about-text">About tea in box</Link>
                    <span className="address">IKP EDEN, kormangala bangalore, karnataka India</span>
                    </div>
                    <div className="divider">
                        <div className="vl"></div>
                    </div>
                    <div className="logo-container">
                        <h1 className="footer-logo">Tea In BOX</h1>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer
