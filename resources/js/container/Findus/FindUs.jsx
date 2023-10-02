//#region imports
import React from 'react';
import spoon from '../../../assets/spoon.svg';
import findus from '../../../assets/findus1.png';
//#endregion

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

const FindUs = () => (
  <div className='app__bg app__wrapper section__padding' id='contact'>
    <div className='app__wrapper_info'>
      <SubHeading tittle='Find Us'/>
      <h1 className='headtext__cormorant' style={{marginBottom: '3rem'}}></h1>
      <div className='app__wrapper-content'>
        <p className='p__opensans'>Av. Adolfo López Mateos Ote. 1801, Bona Gens, 20256 Aguascalientes, Ags.</p>
        <p className='p__cormorant' style={{color: '#dcca87', margin: '2rem 0'}}>Opening Hours</p>
        <p className='p__opensans'>Mon - Fri: 10:00am - 02:00am</p>
        <p className='p__opensans'>Sat - Sun: 10:00am - 03:00am</p>
      </div>
      <a href="https://goo.gl/maps/WcSbCza5kW8TMsNJA" className='custom__button' style={{marginTop: '2rem'}}> Visit Us </a>
    </div>

    <div className='app__wrapper_img'>
      <img src={findus} alt='findus'/>
    </div>
  </div>
);

export default FindUs;
