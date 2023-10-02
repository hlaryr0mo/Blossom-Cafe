import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthContext";


const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/sale/';
const userroute = 'http://localhost/BlossomCafeFINAL/public/api/users'
const clientroute = 'http://localhost/BlossomCafeFINAL/public/api/clients'
const voucherroute = 'http://localhost/BlossomCafeFINAL/public/api/vouchers'

const EditSale= () => {
 //const {token} = useContext(AuthContext);
 const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const { id } = useParams();

    const [date_time, setDate_time]= useState("");
     const [taxes, setTaxes]= useState("");
     const [total, setTotal]= useState("");
     const [statuss, setStatus]= useState("");
     const [client_id, setClient_id]= useState("");
     const [user_id, setUser_id]= useState("");
     const [voucher_id, setVoucher_id]= useState("");
     const [clients, setclients]=useState([]);
     const [users, setUsers]=useState([]);
     const [vouchers, setVouchers]=useState([]);
     const [validationError, setValidationError]= useState({});
     
     const getClients= async()=>{
        await axios.get(`${clientroute}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setclients(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    const getUsers= async()=>{
        await axios.get(`${userroute}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const getVouchers= async()=>{
        await axios.get(`${voucherroute}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setVouchers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }


         

     useEffect( ()=>{
      const getSaleById= async()=>{
          await axios.get(`${endpoint}${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          }).then(res => {
            console.log(res.data)
            setDate_time(res.data.date_time)
          setTaxes(res.data.taxes)
          setTotal(res.data.total)
          setStatus(res.data.statuss)
          setClient_id(res.data.client_id)
          setUser_id(res.data.user_id)
          setVoucher_id(res.data.voucher_id)
    
            
        })
        .catch(err => {
            console.log(err)
        })
          


          
      }
      getSaleById();
      getUsers();
      getClients();
      getVouchers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
     

     

   const updateSale= async(e)=>{
       e.preventDefault();

       const formData = new FormData();

       formData.append('_method', 'PUT');
       formData.append('date_time', date_time);
        formData.append('taxes', taxes);
        formData.append('total', total);
        formData.append('status', statuss);
        formData.append('client_id', client_id);
        formData.append('user_id', user_id);
        formData.append('voucher_id', voucher_id);
        

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
          navigate("/BlossomCafeFINAL/public/sales")
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

  return(
    <div className='container'>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Sale</h4>
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
                            <Form onSubmit={updateSale}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="date_time">
                                            <Form.Label>Date</Form.Label>
                                            <input type='date' className='form-control'  value={date_time} onChange={(event)=>{
                                                setDate_time(event.target.value)
                                            }}></input>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Taxes">
                                            <Form.Label>Taxes</Form.Label>
                                            <Form.Control type='input' value={taxes} onChange={(event)=>{
                                                setTaxes(event.target.value)
                                            }}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Total">
                                            <Form.Label>Total</Form.Label>
                                            
                                            <Form.Control type='input'value={total} onChange={(event)=>{
                                                setTotal(event.target.value)
                                            }}></Form.Control>

                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Status">
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
                                        <Form.Group controlId="client">
                                            <Form.Label>Client</Form.Label>
                                            <Form.Select onChange={(e)=> setClient_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Client</option>
                                                {clients.map(client=>
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                    )}
                                            </Form.Select>
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Group controlId="user">
                                            <Form.Label>User</Form.Label>
                                            <Form.Select onChange={(e)=> setUser_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select User</option>
                                                {users.map(user=>
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                    )}
                                            </Form.Select>
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Group controlId="voucher">
                                            <Form.Label>Voucher</Form.Label>
                                            <Form.Select onChange={(e)=> setVoucher_id(e.target.value)}>
                                                <option hidden defaultValue={true}>Select Voucher</option>
                                                {vouchers.map(voucher=>
                                                    <option key={voucher.id} value={voucher.id}>{voucher.name}</option>
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



export default EditSale;