import Veggie from "./Veggie";
import Popular from "./Popular";
import '../../../css/ProductsMenu.css'

import React from 'react'
import Cuisine from "./Cuisine";

function MainMenu() {
  return (
    <div className="body">
      <Veggie />
      <Popular />
    </div>
  )
}

export default MainMenu
