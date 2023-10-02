//#region Imports
import React from 'react';
import './Laurels.css';
import spoon from '../../../assets/spoon.svg';
import laurels from '../../../assets/laurels1.png';
//#endregion

//#region Other components
const AwardCard = ({ award: { imgUrl, tittle, subtittle } }) => (
  <div className='app__laurels_award-card'>
    <img src={imgUrl} alt='award'/>
    <div className='app__laurels_awards-card_content'>
      <p className='p__cormorant' style={{color: '#dcca87'}}>{tittle}</p>
      <p className='p__cormorant'>{subtittle}</p>
    </div>
  </div>
)

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)
//#endregion

const Laurels = () => (
  <div className='app__bg app__wrapper section__padding' id='awards'>
    <div className='app__wrapper_info'>
      <SubHeading tittle='Awards & recognition'/>
      <h1 className='headtext__cormorant'>Our Laurels</h1>
      <div className='app__laurels_awards'>
        {/* Awards data */}
        {/*data.awards.map((award) => <AwardCard award={award} key={award.title}/>)*/}
      </div>
    </div>

    <div className='app__wrapper_img'>
      <img src={laurels} alt='laurels'/>
    </div>
  </div>
);

export default Laurels;
