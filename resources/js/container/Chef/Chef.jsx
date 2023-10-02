//#region Imports
import React from 'react';
import spoon from '../../../assets/spoon.svg';
import chef from '../../../assets/chef2.png';
import quote from '../../../assets/quote.png';
import sign from '../../../assets/sign1.png';
import './Chef.css';
//#endregion

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

const Chef = () => (
  <div className='app__bg app__wrapper section__padding'>
    <div className='app__wrapper_img app__wrapper_img app__wrapper_img-reverse'>
      <img src={chef} alt='chef'/>
    </div>

    <div className='app__wrapper_info'>
      <SubHeading tittle="Chef's Word"/>
      <h1 className='headtext__cormorant'> What we are</h1>

      <div className='app__chef-content'>
        <div className='app__chef-content_quote'>
          <img src={quote} alt='quote'/>
          <p className='p__opensans'>Look who we are we are the dreamers, we will make it happen because we believe it</p>
        </div>
        <p className='p__opensans'>Teamwork makes the dream work</p>
      </div>

      <div className='app__chef-sign'>
        <p>Jeon Jungkook</p>
        <p className='p__opensans'>Chef & Founder</p>
        <img src={sign} alt='sign'/>
      </div>
    </div>
  </div>
);

export default Chef;
