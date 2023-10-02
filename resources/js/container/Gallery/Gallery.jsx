//#region imports
import React from 'react';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort} from 'react-icons/bs'
import spoon from '../../../assets/spoon.svg';
import gallery01 from '../../../assets/gallery01.jpg';
import gallery02 from '../../../assets/gallery02.jpg';
import gallery03 from '../../../assets/gallery03.jpg';
import gallery04 from '../../../assets/gallery04.jpg';
import './Gallery.css';
const galleryImages = [ gallery01, gallery02, gallery03, gallery04 ]
//#endregion

const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const {current} = scrollRef;
    if(direction === 'left'){
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  }

  return(
    <div className='app__gallery flex__center'>
      <div className='app__gallery-content'>
        <SubHeading tittle='Instagram'/>
        <h1 className='headtext__cormorant'>Photo Gallery</h1>
        <p className='p__opensans' style={{color: '#aaa', marginTop: '2rem'}}> Please give lots of love to our instagram account</p>
        <a href="https://www.instagram.com/blessroll_pyeongtaek/" className='custom__button'> View More </a>
      </div>

      <div className='app__gallery-images'>
        <div className='app__gallery-images_container' ref={scrollRef}>
          {galleryImages.map((image, index) =>
            <div className='app__gallery-images_card flex__center' key={`gallery_image-${index + 1}`}>
              <img src={image} alt='gallery'/>
              <BsInstagram className='gallery__image-icon'/>
            </div>
            )}
        </div>
        <div className='app__gallery-images_arrows'>
          <BsArrowLeftShort className='gallery__arrow-icon' onClick={() => scroll('left')}/>
          <BsArrowRightShort className='gallery__arrow-icon' onClick={() => scroll('right')}/>
        </div>

      </div>
    </div>
  )}

export default Gallery;
