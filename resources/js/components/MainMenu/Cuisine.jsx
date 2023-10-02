import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import '../../../css/ProductsMenu.css'
import Category from './Category'
import Search from './Search'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();
    //1:16:59
    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ebb5369298e64344b99f5f76272a934d&query=${name}`)
        const recipes = await data.json()
        setCuisine(recipes.results);
    }

    //1:19:53 
    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    }, [params.type]);

    return (
        <div className='all'>
            <Search />
            <Category />
            <Grid>
                {cuisine.map((item) => {
                    return (
                        <Card key={item.id}>
                            <img src={item.image} alt='' />
                            <h4>{item.tittle}</h4>
                        </Card>
                    )
                })}
            </Grid>
        </div>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

export default Cuisine