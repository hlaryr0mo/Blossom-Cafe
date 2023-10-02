import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/product/';
const endpointt = 'http://localhost/BlossomCafeFINAL/public/api/subcategories'

const EditProduct= () => {
    //const {token} = useContext(AuthContext);
    const token = localStorage.getItem('token');

     const  navigate = useNavigate()
     const { id } = useParams(); 

     const [name, setName]= useState("");
     const [description, setDescription]= useState("");
     const [price, setPrice]= useState("");
     const [stock, setStock]= useState("");
     const [status, setStatus]= useState("");
     const [subcategory_id, setsubCategoryId]= useState("");
     const [subcategories, setSubcategory]= useState([]);
     const [validationError, setValidationError]= useState({});

     const getData= async()=>{
         await axios.get(`${endpointt}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setSubcategory(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }

    
     useEffect( ()=>{
    const getProductyById= async()=>{
        await axios.get(`${endpoint}${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            } 
        }).then(res => {
            console.log(res.data)
            setName(res.data.name)
            setDescription(res.data.description)
            setPrice(res.data.price)
            setStock(res.data.stock)
            setStatus(res.data.status)
    
            setSubCategory(res.data.subcategory_id)
        })
        .catch(err => {
            console.log(err)
        })
       
    }
    getProductyById()
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
   

 const updateProduct= async(e)=>{
     e.preventDefault();

     const formData = new FormData();

     formData.append('_method', 'PUT');
     formData.append('name', name);
     formData.append('description', description);
     formData.append('price', price);
     formData.append('stock', stock);
     formData.append('status', status);
     formData.append('subcategory_id', subcategory_id);
      

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
        navigate("/BlossomCafeFINAL/public/products")
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
 return (
    <div className='container'>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update Product</h4>
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
                            <Form onSubmit={updateProduct}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="nameProduct">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(event)=>{
                                                setName(event.target.value)
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
                                        <Form.Group controlId="Price">
                                            <Form.Label>Price</Form.Label>
                                            
                                            <Form.Control type='input'value={price} onChange={(event)=>{
                                                setPrice(event.target.value)
                                            }}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="Stock">
                                            <Form.Label>Stock</Form.Label>
                                            
                                            <Form.Control type='input' value={stock} onChange={(event)=>{
                                                setStock(event.target.value)
                                            }}></Form.Control>                                          
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            
                                            <Form.Select onChange={(e) => setStatus(e.target.value)}>
                                                    <option>Select Status</option>
                                                    <option value={1}>True</option>
                                                    <option value={0}>False</option>

                                                </Form.Select>

                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Group controlId="SubCategory">
                                            <Form.Label>SubCategory</Form.Label>
                                            <Form.Select onChange={(e)=> setsubCategoryId(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Category</option>
                                                {subcategories.map(subcategory=>
                                                    <option key={subcategory.id} value={subcategory.id}>{subcategory.nameSub}</option>
                                                    )}
                                            </Form.Select>
                                            </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
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

export default EditProduct