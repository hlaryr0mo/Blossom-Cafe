import React, {useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'https://localhost/BlossomCafeFINAL/public/api/sale_detail'
const endpointt = 'http://localhost/BlossomCafeFINAL/public/api/products'
const CreateSale_Details = () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const  navigate = useNavigate()

     const [quantity, setQuantity]= useState("");
     const [price, setPrice]= useState("");
     const [sale_id, setSale_id]= useState("");
     const [product_id, setProduct_id]= useState("");
     const [products, setProducts]= useState([]);
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
            setProducts(res.data)
        })
        
    }

     useEffect(()=>{
        getData()
     },[]);

     const CreateSaleDetails = async (e)=>{
        e.preventDefault();

        const formData = new FormData ();

        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('sale_id', sale_id);
        formData.append('product_id', product_id);
        

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
            navigate("/BlossomCafeFINAL/public/sales_details");
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
                        <h4 className="card-title">Create Sale Detail</h4>
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
                            <Form onSubmit={CreateSaleDetails}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <input type='input' className='form-control'  value={quantity} onChange={(event)=>{
                                                setQuantity(event.target.value)
                                            }}></input>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type='input' value={price} onChange={(event)=>{
                                                setPrice(event.target.value)
                                            }}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Sale_id">
                                            <Form.Label>Sale</Form.Label>
                                            
                                            <Form.Control type='input'value={sale_id} onChange={(event)=>{
                                                setSale_id(event.target.value)
                                            }}></Form.Control>

                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col>
                                    <Form.Group controlId="producto">
                                            <Form.Label>Product</Form.Label>
                                            <Form.Select onChange={(e)=> setProduct_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Product</option>
                                                {products.map(product=>
                                                    <option key={product.id} value={product.id}>{product.name}</option>
                                                    )}
                                            </Form.Select>
                                            
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

export default CreateSale_Details