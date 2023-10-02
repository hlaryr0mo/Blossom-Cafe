import React from 'react'
import { FaCoffee, FaIceCream, FaHome } from 'react-icons/fa'
import { MdCake, MdBreakfastDining } from 'react-icons/md'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


function Category() {
  return (
    <div>
        <SLink to={'/BlossomCafeFINAL/public/'}>
            <FaHome />
            <h4>BACK</h4>
        </SLink>
    <List>
        <SLink to={'/BlossomCafeFINAL/public/cuisine/Coffe'}>
            <FaCoffee />
            <h4>Coffe</h4>
        </SLink>
        <SLink to={'/BlossomCafeFINAL/public/cuisine/Dessert'}>
            <MdCake />
            <h4>Dessert</h4>
        </SLink>
        <SLink to={'/BlossomCafeFINAL/public/cuisine/Ice%20cream'}>
            <FaIceCream />
            <h4>Bingsu</h4>
        </SLink>
        <SLink to={'/BlossomCafeFINAL/public/cuisine/Breakfast'}>
            <MdBreakfastDining />
            <h4>Breakfast</h4>
        </SLink>
    </List>
    </div>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4{
        color: white;
        font-size: 0.8rem;
    }
    svg{
        color: white; 
        font-size: 1.5rem;
    }
    &.active{
        background: linear-gradient(to right, #f27121, #e94057);
        svg{
            color: white;
        }
        h4{
            color: white;
        }
    }

`

export default Category