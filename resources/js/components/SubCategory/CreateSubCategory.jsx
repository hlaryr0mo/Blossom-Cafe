import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/subcategory'
const endpointt = 'http://localhost/BlossomCafeFINAL/public/api/categories'


const CreateSubCategory = () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const  navigate = useNavigate();
     const [nameSub, setnameSub]= useState("");
     const [description, setDescription]= useState("");
     const [image, setimage]= useState("");
     const [validationError, setValidationError]= useState({});
     const [category_id, setCategory_id]= useState("");
     const [categories, setCategory]= useState([]);
     const changeHandler = (event)=>{
        setimage(event.target.files[0]);

     }

     const getData= async()=>{
         await axios.get(`${endpointt}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setCategory(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

     useEffect(()=>{
        getData()
     },[]);
     const createSubCategory = async (e)=>{
        e.preventDefault();

        const formData = new FormData ();

        formData.append('nameSub', nameSub);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('image', image);

        await axios.post(endpoint, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(({data}) =>{
            Swal.fire({
                icon:"success",
                text: data.message
            })
            navigate("/BlossomCafeFINAL/public/subcategories");
        }).catch(({response})=> {
            if(response.status === 422){
                setValidationError(response.data.errors);
            } else{
                Swal.fire({
                    text: response.data.message,
                    icon:"error"
                })
            }
        })

     }
  return (
    <div className='container'>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create SubCategory</h4>
                        <hr />
                        <div className="from-wrapper">
                            {Object.keys(validationError).length>0 &&(
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {Object.entries(validationError).map(([key, value])=>(
                                                    <li key={key}>{value}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Form onSubmit={createSubCategory}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="nameSub">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={nameSub} onChange={(event)=>{
                                                setnameSub(event.target.value)
                                            }}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                                                setDescription(event.target.value)
                                            }}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Category">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select onChange={(e)=> setCategory_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Category</option>
                                                {categories.map(category=>
                                                    <option key={category.id} value={category.id}>{category.nameCategory}</option>
                                                    )}
                                            </Form.Select>
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="image">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" onChange={changeHandler} encType="multipart/form-data"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default CreateSubCategory