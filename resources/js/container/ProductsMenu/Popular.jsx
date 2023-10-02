import React, { useEffect, useState } from 'react'

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    },[]);

    const getPopular = async () =>{
        //obtener los datos
        //regresar nomas 9
    }

  return (
    <div>
      {popular.map((recipe) => {
        return(
            <div key={recipe.id}>
                <p>{recipe.title}</p>
            </div>
        );
      })}
    </div>
  )
}

export default Popular
