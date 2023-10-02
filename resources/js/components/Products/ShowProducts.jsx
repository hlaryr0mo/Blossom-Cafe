import { useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar';
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { MdAddCircle, MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { HiViewGrid } from 'react-icons/hi'
import { result } from "lodash";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api';

const ShowProducts = () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProduct();
    }, [])

    const getAllProduct = async () => {
        await axios.get(`${endpoint}/products`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setProducts(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const deleteProduct= async(id)=> {
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

        await axios.delete(`${endpoint}/product/${id}`,{
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
            getAllProduct();
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
        <div className='container' style={{ margin: '2rem' }}>
            <div className="row">
                <div className="col-12">
                <Link to={"/BlossomCafeFINAL/public/product/create"} className='btn btn-secondary mb-2 float-end'>
                    <MdAddCircle /> Create
                    </Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <div className="table table table-bordered mb-0 text-center table-responsive">
                            <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Description</td>
                                            <td>Price</td>
                                            <td>Stock</td>
                                            <td>Status</td>
                                            <td>SubCategory</td>
                                            <td>Photo</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        products.length > 0 ? (
                                            products.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.stock}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.Subcategory}</td>
                                                    <td>
                                                        <img width="50px" src={`http://localhost/BlossomCafeFINAL/public/${item.photo}`} alt="" />
                                                    </td>

                                                    <td>
                                                        <Link to={`/BlossomCafeFINAL/public/product/update/${item.id}`} className="btn btn-success me-2">
                                                        <FiEdit />
                                                        </Link>
                                                        <Link to= {`/BlossomCafeFINAL/public/product/view/${item.id}`} className='btn btn-primary me-2'><HiViewGrid /></Link>

                                                        <Button variant='danger' onClick={() => deleteProduct(item.id)}>
                                                        <MdDelete />
                                                        </Button>
                                                    </td>

                                                </tr>

                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={'8'}>No Products found</td>
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

export default ShowProducts