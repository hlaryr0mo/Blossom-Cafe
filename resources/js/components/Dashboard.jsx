import React, { useState, useEffect, useContext } from 'react'
import Sidebar from './Sidebar'
import '../container/Header/Header.css';
import welcome from '../../assets/chef1.png';
import spoon from '../../assets/spoon.svg';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext';
import '../../css/Dashboard.css'

const SubHeading = ({ tittle }) => (
  <div style={{ marginBottom: '1rem' }}>
    <p className='p__cormorant'>{tittle}</p>
    <img src={spoon} alt='spoon' className='spoon__img' />
  </div>
)

//Username and token from DB is showing here with help pf the localStorge
const usersss = localStorage.getItem('users');
const token = localStorage.getItem('token');

const Dashboard = () => {
  let navigate = useNavigate();

useEffect(() => {
    if (!token) {
      navigate("/BlossomCafeFINAL/public/signin")
    } 
  }, [navigate]);

  return (
    <div>
      <Sidebar />
      <div className='app__header app__wrapper section__padding' id='home'>
        <div className='app__wrapper_info'>
          <SubHeading tittle='Seller’s dashboard' />
          <h1 className='app__header-h1'>Welcome {usersss}</h1>
        </div>
        <div className='app__wrapper_img'>
          <img src={welcome} alt='header_image' />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;