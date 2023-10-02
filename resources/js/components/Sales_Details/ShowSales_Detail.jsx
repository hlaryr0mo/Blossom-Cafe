import { useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MdAddCircle, MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { HiViewGrid } from 'react-icons/hi'
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { result } from "lodash";
import Sidebar from '../Sidebar';
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'https://localhost/BlossomCafeFINAL/public/api';

const ShowSale_Details = () => {
    //const {token} = useContext(AuthContext);
    const token = localStorage.getItem('token');


    const [saleDetails, setSaleDetails] = useState([]);

    useEffect(() => {
        getAllSalesDetails();
    }, [])

    const getAllSalesDetails = async () => {
         await axios.get(`${endpoint}/sales_details`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setSaleDetails(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const deleteSale= async(id)=> {
        const isConfirm =await Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!"
        }).then((result)=> {
            return result.isConfirmed
        })
        if(!isConfirm){
            return;
        }

        await axios.delete(`${endpoint}/sale_detail/${id}`,{
            headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(({data})=> {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            getAllSalesDetails();
        }).catch(({response:{data}}) =>{
            Swal.fire({
                text: data.message,
                icon: 'error'
            })
        })
    }
    return (
        <div>
    <Sidebar />
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <Link className='btn btn-primary mb-2 float-end' to={"/BlossomCafeFINAL/public/sale_detail/create"}>
                    <MdAddCircle /> Create
                    </Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <div className="table table table-bordered mb-0 text-center">
                            <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>Price</td>
                                            <td>Sale</td>
                                            <td>Product</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saleDetails.length > 0 ? (
                                            saleDetails.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.sale_id}</td>
                                                    <td>{item.Product}</td>
                                                    
                                                    <td>
                                                        <Link to={`/BlossomCafeFINAL/public/sale_detail/update/${item.id}`} className="btn btn-success me-2">
                                                        <FiEdit />
                                                        </Link>
                                                        <Button variant='danger' onClick={() => deleteSale(item.id)}>
                                                        <MdDelete />
                                                        </Button>
                                                    </td>

                                                </tr>

                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={'5'}>No SaleDetails found</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                    </Table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        </div>
    )
}

export default ShowSale_Details