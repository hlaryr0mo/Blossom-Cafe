import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Link } from "react-router-dom";
import '../../../css/Forms.css'
import PropTypes from 'prop-types';
import { AuthContext } from "../../Auth/AuthContext";


const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/category/'


const ViewCategory = props => {
    //const {token} = useContext(AuthContext);
 const token = localStorage.getItem('token');

    const [inputs, setInputs] = useState({})
    const { id } = useParams()


    useEffect(() => {
        const getCategoryById = async () => {
            const response = await axios.get(`${endpoint}${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setInputs({
                nameCategory: response.data.nameCategory,
                description: response.data.description,
            })

        }
        getCategoryById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="form__edit">
                <h2 className="h2__form">{inputs.nameCategory}</h2>
                <p className="p__form" type="Description:">
                    <p className="input__form">{inputs.description}</p>
                </p>
                <Link className='button__form' to={"/BlossomCafeFINAL/public/categories"}>Go Back</Link>
            </div>
        </div>
    )

}

ViewCategory.propTypes = {}

export default ViewCategory