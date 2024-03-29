import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

function Recipe() {

  let params = useParams({}); 
  const [details, setDetails] = useState();
  const[activeTab, setActiveTab] = useState("instructions");
  //1:50:3...
  const fetchDetails = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=ebb5369298e64344b99f5f76272a934d`)
    const detailData = await data.json();
    //if is an array u put ".results", otherwise u just put the result 
    setDetails(detailData);
  }

  useEffect(()=>{
    fetchDetails();
  },[params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=''/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
      <div>
        <h3>{details.info}</h3>
      </div>
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe
