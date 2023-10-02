//#region Imports
import React from 'react'
import './Header.css';
import { Link } from "react-router-dom";
import welcome from '../../../assets/welcome1.png';
import spoon from '../../../assets/spoon.svg';
//#endregion

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

const Header = () => {
  return (
    <div className='app__header app__wrapper section__padding' id='home'>
        <div className='app__wrapper_info'>
            <SubHeading tittle='Chase the new flavour'/>
            <h1 className='app__header-h1'>Blossom Cafe</h1>
            <p className='p__opensans' style={{margin: '2rem 0'}}>Coffee shop project for the Advanced Topics in Web Development class.</p>
            <button type='button' className='custom__button'>
              <Link to={`/BlossomCafeFINAL/public/Pages`} className='custom__button'>Explore Menu</Link></button>
        </div>
        <div className='app__wrapper_img'>
          <img src={welcome} alt='header_image'/>
        </div>
    </div>
  )
}

export default Header
