import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Contact Us</h1>
                        <p>Librarian</p>
                        <p>KNUST (College of Science)</p>
                        <p>Kumasi</p>
                        <p>Ghana</p>
                        <p><b>Email:</b>example@gmail.com</p>
                    </div>
                    
                    <div className='librarian-details'>
                        <h1>Librarian</h1>
                        <p>Name</p>
                        <p>Education</p>
                        <p>Contact: +233 000000000</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='https://x.com/knustgh?s=21&t=iTGxFnGwbXuhh-I9zocTGw' target='_blank' rel="noreferrer"   className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='https://www.linkedin.com/groups/772157' target='_blank'rel="noreferrer"  className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='https://www.instagram.com/knust.gh?igsh=MW5zb3hsdDE2aTZhcw==' target='_blank' rel="noreferrer" className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2024 copyright all right reserved<br /><span>Work in progress</span></p>
            </div>
        </div>
    )
}

export default Footer