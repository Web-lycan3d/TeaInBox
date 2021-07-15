import React , {Fragment} from 'react'
import {Link } from 'react-router-dom'

import './contact.styles.scss'

const Contact = () => {
    return (
        <Fragment>
            <div className="contact-container">
                <div className="contact-img ">
                    <img src="/images/contact/contact-img.png" alt="" className="img-fluid"/>
                </div>
                <div className="contact-text">
                    <h1>Let's get in touch</h1>
                    <p>Every good conversation starts with a warm cup of tea, the tea's on us!</p>
                    <p>Give us a call at +91 8123115590</p>
                    <p>Or pay us a visit at IKP Eden , Koramangala , Bengaluru 560076.</p>
                    <Link to="#!" className="google-link">Click here to get directions on Google maps</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Contact
