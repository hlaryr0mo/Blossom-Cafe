//#region imports
import React from 'react';
import spoon from '../../../assets/spoon.svg';
import logo from '../../../assets/blossom_white.png';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'
import './Footer.css'
//#endregion

//#region Other components
const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

export const Newsletter = () => (
  <div className='app__newsletter'>
      <div className='app__newsletter-heading'>
          <SubHeading tittle='Newsletter'/>
          <h1 className='headtext__cormorant'>Subscribe to Our Newsletter</h1>
          <p className='p__opensans'>And never miss latest Updates!</p>
      </div>
      <div className='app__newsletter-input flex__center'>
          <input type='email' placeholder='Enter your e-mail address' />
          <button className='custom__button'>Subscribe</button>
      </div>
  </div>
)

export const FooterOverlay = () => (
  <div className='app__footerOverlay'>
      <div className='app__footerOverlay-black'/>
      <div className='app__footerOverlay-img app__bg'/>
  </div>
)
//#endregion

const Footer = () => (
  <div className='app__footer section__padding'>
    <FooterOverlay />
    <Newsletter />

    <div className='app__footer-links'>
      <div className='app__footer-links_contact'>
        <h1 className='app__footer-headtext'>Contact Us</h1>
        <p className='p__opensans'>Av. Adolfo López Mateos Ote. 1801, Bona Gens, 20256 Aguascalientes, Ags.</p>
        <p className='p__opensans'>449 476 1544</p>
        <p className='p__opensans'>449 508 0769</p>
      </div>
      <div className='app__footer-links_logo'>
        <img src={logo} alt='footer_logo'/>
        <p className='p__opensans'>"The best way to find yourself is to lose yourself in the service of others."</p>
        <img src={spoon} alt='spoon' className='spoon__img' style={{marginTop: 15}}/>
        <div className='app__footer-links_icons'>
          <FiFacebook/>
          <FiTwitter/>
          <FiInstagram/>
        </div>
      </div>
      <div className='app__footer-links_work'>
      <h1 className='app__footer-headtext'>Working Hours</h1>
        <p className='p__opensans'>Monday-Friday:</p>
        <p className='p__opensans'>8:00 am - 12:00 am</p>
        <p className='p__opensans'>Saturday-Sunday:</p>
        <p className='p__opensans'>7:00 am - 11:00 pm</p>
      </div>
    </div>
    <div className='footer__copyright'>
      <p className='p__opensans'>2022 Blossom Cafe. All Rights reserved.</p>
    </div>
  </div>
);

export default Footer;
