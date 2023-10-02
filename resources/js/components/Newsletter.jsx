import React from 'react'
import '../../css/Newsletter.css'

const SubHeading = ({ tittle }) => (
    <div style={{marginBottom: '1rem'}}>
      <p className='p__cormorant'>{tittle}</p>
      <img src='' alt='spoon' className='spoon__img'/>
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
