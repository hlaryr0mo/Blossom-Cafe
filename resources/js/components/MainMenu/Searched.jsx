import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../../../css/ProductsMenu.css'
import Category from './Category'
import Search from './Search'

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
    //1:40:22
    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ebb5369298e64344b99f5f76272a934d&query=${name}`)
        const recipes = await data.json()
        setSearchedRecipes(recipes.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <div className='all'>
            <Search />
            <Category />
            <Grid>
                {searchedRecipes.map((item) => {
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

export default Searched
