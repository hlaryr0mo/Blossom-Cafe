import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from "../../Auth/AuthContext";


const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/product/'


const ViewProducts = props => {
    //const {token} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [inputs, setInputs]= useState({})
    const {id}= useParams()
    

    useEffect(()=>{
        const getProductById= async()=>{
            const response = await axios.get(`${endpoint}${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setInputs({
                name:response.data.name,
                description:response.data.description,
                price:response.data.price,
                stock:response.data.stock,
                status:response.data.status,
                photo:response.data.photo,
                subcategory_id:response.data.subcategory_id,

            })
            
        }
        getProductById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div style={{ margin: '3rem' }}>
            <h2>{inputs.name}</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Description</h4>
                        <p>{inputs.description}</p>
                        <h4>Price</h4>
                        <p>{inputs.price}</p>
                        <h4>Stock</h4>
                        <p>{inputs.stock}</p>
                        <h4>Status</h4>
                        <p>{inputs.status}</p>
                        <h4>Photo</h4>
                        <p>
                        <img width="100px" src={`https://localhost/BlossomCafeFINAL/public/${inputs.photo}`} alt="" />
                        </p>
                        <h4>SubCategory</h4>
                        <p>{inputs.subcategory_id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
 
}

ViewProducts.propTypes = {}

export default ViewProducts