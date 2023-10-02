import { useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MdAddCircle, MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { HiViewGrid } from 'react-icons/hi'
import { FaHome } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { result } from "lodash";
import Sidebar from '../Sidebar';
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api';

const ShowSubCategory = () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const [subCategory, setsubCategory] = useState([]);

    useEffect(() => {
        getAllSubCategory();
    }, [])

    const getAllSubCategory = async () => {
        await axios.get(`${endpoint}/subcategories`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setsubCategory(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const deleteSubcategory= async(id)=> {
        const isConfirm =await Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DCCA87',
            cancelButtonColor: '#0C0C0C',
            confirmButtonText: "Yes, delete it!"
        }).then((result)=> {
            return result.isConfirmed
        })
        if(!isConfirm){
            return;
        }

        await axios.delete(`${endpoint}/subcategory/${id}`,{
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
            getAllSubCategory();
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
                    <Link className='btn btn-secondary mb-2 float-end' to={"/BlossomCafeFINAL/public/subcategories/create"}>
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
                                            <td>Category</td>
                                            <td>Image</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        subCategory.length > 0 ? (
                                            subCategory.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.nameSub}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.Category}</td>
                                                    <td>
                                                        <img width="50px" src={`http://localhost/BlossomCafeFINAL/public/${item.image}`} alt="" />
                                                    </td>
                                                    <td>
                                                        <Link to={`/BlossomCafeFINAL/public/subcategory/update/${item.id}`} className="btn btn-success me-2">
                                                        <FiEdit />
                                                        </Link>
                                                        <Link to= {`/BlossomCafeFINAL/public/subcategory/view/${item.id}`} className='btn btn-primary me-2'><HiViewGrid /></Link>

                                                        <Button variant='danger' onClick={() => deleteSubcategory(item.id)}>
                                                        <MdDelete />
                                                        </Button>
                                                    </td>

                                                </tr>

                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={'5'}>No subCategory found</td>
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

export default ShowSubCategory