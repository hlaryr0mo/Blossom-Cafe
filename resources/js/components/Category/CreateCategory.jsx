import React from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useState } from 'react';
import '../../../css/Forms.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/category'

const CreateCategory = () => {
     //const {token} = useContext(AuthContext);
     const token = localStorage.getItem('token');

    const [nameCategory,setnameCategory] = useState('')
    const [validationError, setValidationError]= useState({});
    const [description,setdescription] = useState('')
    const navigate= useNavigate()

    const store = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nameCategory', nameCategory);
        formData.append('description', description);

        await axios.post(endpoint, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/BlossomCafeFINAL/public/categories");
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

  return (
    <div>
        <form onSubmit={store} className='form__edit'>
        <h2 className="h2__form">CREATE</h2>
            <p className="p__form" type="Name">
                <input 
                    value={nameCategory}
                    onChange={ (e)=>setnameCategory(e.target.value)} 
                    type= 'text'
                    className='input__form'/>
                    </p>
                    <p className="p__form" type="Description:">
                <input 
                    value={description}
                    onChange={ (e)=>setdescription(e.target.value)} 
                    type= 'text'
                    className="input__form"/>
                    </p>
                    <button className="button__form" type='submit'>Store</button>
                <Link className='button__form' to={"/BlossomCafeFINAL/public/categories"} style={{margin:'10px 0px 0px 100px'}}>Go Back</Link>
        </form>
    </div>
  )
}

export default CreateCategory