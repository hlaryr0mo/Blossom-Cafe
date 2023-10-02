import React from 'react'
import Home from './MainMenu'
import '../../../css/ProductsMenu.css'
import Category from './Category'
import Search from './Search'

function Pages() {
  return (
    <div className='all'>
        <Search/>
        <Category/>
        <Home />
    </div>
  )
}

export default Pages