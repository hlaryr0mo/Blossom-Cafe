import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthContext";


const endpoint = 'https://localhost/BlossomCafeFINAL/public/api/sale_detail'
const productR = 'http://localhost/BlossomCafeFINAL/public/api/products'
const saleR ='https://localhost/BlossomCafeFINAL/public/api/sales'

const EditSale_Details= () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const { id } = useParams();
    const [quantity, setQuantity]= useState("");
     const [price, setPrice]= useState("");
     const [sale_id, setSale_id]= useState("");
     const [product_id, setProduct_id]= useState("");
     const [products, setProducts]= useState([]);
     const [sales, setSales]= useState([]);
     const [validationError, setValidationError]= useState({});
     
    const getSales= async()=>{
        const response = await axios.get(`${saleR}`)
        setSales(response.data)
    }
    
    const getProduct= async()=>{
        const response = await axios.get(`${productR}`)
        setProducts(response.data)
    }

     useEffect( ()=>{
      const getSale_DetailById= async()=>{
          const response = await axios.get(`${endpoint}${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
          setQuantity(response.data.quantity)
          setPrice(response.data.price)
          setSale_id(response.data.sale_id)
          setProduct_id(response.data.product_id)
      }
      getSale_DetailById();
      getSales();
      getProduct();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
     

   const updateSale_detail= async(e)=>{
       e.preventDefault();

       const formData = new FormData();

       formData.append('_method', 'PUT');
       formData.append('quantity', quantity);
       formData.append('price', price);
       formData.append('sale_id', sale_id);
       formData.append('product_id', product_id);
        

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
          navigate("/BlossomCafeFINAL/public/sales_details")
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
                        <h4 className="card-title">Update Sale Detail</h4>
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
                            <Form onSubmit={updateSale_detail}>
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
                                    <Form.Group controlId="sale">
                                            <Form.Label>Sale</Form.Label>
                                            <Form.Select onChange={(e)=> setSale_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Sale</option>
                                                {sales.map(sale=>
                                                    <option key={sale.id} value={sale.id}>{sale.id}</option>
                                                    )}
                                            </Form.Select>
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

export default EditSale_Details