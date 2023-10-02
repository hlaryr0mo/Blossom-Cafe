import React from 'react';
import spoon from '../../assets/spoon.svg';

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
);

export default SubHeading;
