import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../../css/Forms.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/category/'

const EditCategory = () => {
//const {token} = useContext(AuthContext);
 const token = localStorage.getItem('token');

    const [nameCategory, setnameCategory] = useState('')
    const [description, setdescription] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const updateCategory= async(e)=>{
        e.preventDefault();

        const formData = new FormData();
 
        formData.append('_method', 'PUT');
        formData.append('nameCategory', nameCategory);
         formData.append('description', description);
         
         await axios.post(`${endpoint}${id}`, formData,{
             headers: {
                 'Content-Type': 'multipart/form-data',
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`
             }
         }).then(({data})=> {
           Swal.fire({
             icon: "success",
             text: data.message
           })
           navigate("/BlossomCafeFINAL/public/categories")
         }).catch(({response})=> {
           if (response.status === 422){
             setValidationError(response.errors)
           }else{
             Swal.fire({
               text: response.data.message,
               icon: "error"
             })
           }
         })
     }


    useEffect(() => {
        const getCategoryById = async () => {
            const response = await axios.get(`${endpoint}${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setnameCategory(response.data.nameCategory)
            setdescription(response.data.description)
        }
        getCategoryById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <form className="form__edit" onSubmit={updateCategory}>
                <h2 className="h2__form">EDIT</h2>
                <p className="p__form" type="Name:">
                    <input className="input__form" value={nameCategory}
                        onChange={(e) => setnameCategory(e.target.value)}
                        type='text'
                        placeholder="Write the category name.."></input>
                </p>
                <p className="p__form" type="Description:">
                    <input className="input__form" placeholder="Description"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        type='text'></input>
                </p>
                <button className="button__form" type='submit'>Update</button>
                <Link className='button__form' to={"/BlossomCafeFINAL/public/categories"} style={{margin:'10px 0px 0px 100px'}}>Go Back</Link>
            </form>
        </div>
    )
}

export default EditCategory