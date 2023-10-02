import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { AuthContext } from "../../Auth/AuthContext";
import PropTypes from 'prop-types';

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/subcategory/'


const ViewSubCategory = props => {
    //const {token} = useContext(AuthContext);
 const token = localStorage.getItem('token');

    const [inputs, setInputs]= useState({})
    const {id}= useParams()
    

    useEffect(()=>{
        const getSubCategoryById= async()=>{
            const response = await axios.get(`${endpoint}${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setInputs({
                nameSub:response.data.nameSub,
                description:response.data.description,
                image:response.data.image,
                category_id:response.data.category_id,

            })
            
        }
        getSubCategoryById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div>
            <h2>View SubCategory</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h2>Name</h2>
                        <p>{inputs.nameSub}</p>
                        <h2>Description</h2>
                        <p>{inputs.description}</p>
                        <h2>Image</h2>
                        <p>
                        <img width="100px" src={`https://localhost/BlossomCafeFINAL/public/${inputs.image}`} alt="" />
                        </p>
                        <h2>Category</h2>
                        <p>{inputs.category_id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
 
}

ViewSubCategory.propTypes = {}

export default ViewSubCategory