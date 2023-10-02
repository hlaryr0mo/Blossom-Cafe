import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/subcategory/';
const endpointt = 'http://localhost/BlossomCafeFINAL/public/api/categories'

const EditSubCategory= () => {
 //const {token} = useContext(AuthContext);
 const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const { id } = useParams();
    const [nameSub, setnameSub]= useState("");
    const [description, setDescription]= useState("");
    const [categories, setCategory]= useState([]);
    const [category_id, setCategory_id]= useState("");
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
            setCategory(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    

     useEffect( ()=>{
      const getSubCategoryById= async()=>{
           await axios.get(`${endpoint}${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            } 
          }).then(res => {
            console.log(res.data)
            setnameSub(res.data.nameSub)
            setDescription(res.data.description)
            setCategory_id(res.data.category_id)
    
        })
        .catch(err => {
            console.log(err)
        })
          
      }
      getSubCategoryById()
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
     

   const updateSubCategory= async(e)=>{
       e.preventDefault();

       const formData = new FormData();

       formData.append('_method', 'PUT');
       formData.append('nameSub', nameSub);
       formData.append('description', description);
       formData.append('category_id', category_id);
        

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
          navigate("/BlossomCafeFINAL/public/subcategories")
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
                    <h4 className="card-title">Update SubCategory</h4>
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
                        <Form onSubmit={updateSubCategory}>
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
export default EditSubCategory;
