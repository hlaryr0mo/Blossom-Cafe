//#region Imports
import React from 'react';
import spoon from '../../../assets/spoon.svg';
import menu from '../../../assets/menu1.png';
import { Link } from "react-router-dom";
import './SpecialMenu.css';
//#endregion

//#region Extra Components
const SubHeading = ({ tittle }) => (
  <div style={{marginBottom: '1rem'}}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img'/>
  </div>
)

const MenuItem = ({ title, price, tags }) => (
    <div className='app__menuitem'>
      <div className='app__menuitem-head'>
        <div className='app__menuitem-name'>
          <p className='p__cormorant' style={{color:'#DCCA87'}}>{title}</p>
        </div>
        <div className='app__menuitem-dash'></div>
        <div className='app__menuitem-price'>
          <p className='p__cormorant'>{price}</p>
        </div>

        <div className='app__menuitem-sub'>
          <p className='p__opensans' style={{color: '#AAA'}}>{tags}</p>
        </div>
      </div>
    </div>
)

//#endregion

const SpecialMenu = () => {
  return (
  <div className='app__specialMenu flex__center section__padding' id='menu'>
    <div className='app__specialMenu-title'>
      <SubHeading tittle='Menu that fits you palatte'/>
      <h1 className='headtext__cormorant'>Today's special</h1>
    </div>
    <div className='app__specialMenu-menu'>
      <div className='app__specialMenu-menu_wine flex__center'>
        <p className='app__specialMenu-menu_heading'>Coffe & Tea</p>
        <div className='app__specialMenu_menu_items'>
          {/* Menu Item */}
          <MenuItem key='1' title='Americano' price='$100' tags='MXN'/>
          <MenuItem key='2' title='Latte' price='$100' tags='MXN'/>
          <MenuItem key='3' title='Capucchino' price='$100' tags='MXN'/>
          {/* Lo del Menu Item  
          {data.wines.map((wine, index) => (
            <Menuitem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags}/>
          ))}
          */}
        </div>
      </div>

      <div className='app__specialMenu-menu_img'>
        <img src={menu} alt='menu img'/>
      </div>

      <div className='app__specialMenu-menu_cocktails flex__center'>
        <p className='app__specialMenu-menu_heading'>Deserts</p>
        <div className='app__specialMenu_menu_items'>
          <MenuItem key='1' title='Cake' price='$100' tags='MXN'/>
          <MenuItem key='2' title='Chessecake' price='$100' tags='MXN'/>
          <MenuItem key='3' title='Brownie' price='$100' tags='MXN'/>
          {/* Lo del Menu Item  
          {data.cocktails.map((cocktail, index) => (
            <MenuItem key={cocktail.title + index} title={cocktail.price} tags={cocktail.tags}/>
          ))}
          */}
        </div>
      </div>
    </div>

    <div style={{marginTop: '15px'}}>
      <button type='button' className='custom__button'><Link to={`/error`} className='custom__button'>View More</Link></button>
    </div>
  </div>
)
}

export default SpecialMenu
