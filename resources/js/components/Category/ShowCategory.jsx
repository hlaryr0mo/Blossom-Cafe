import React, { useContext } from "react";
import axios from "axios";
import Sidebar from '../Sidebar'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdAddCircle, MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { HiViewGrid } from 'react-icons/hi'
import { FaHome } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api'

const ShowCategory = () => {
    //const {token} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [categoriesF, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory();
    }, [])

    const getAllCategory = async () => {
        await axios.get(`${endpoint}/categories`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setCategories(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const deleteCategory= async(id)=> {
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

        await axios.delete(`${endpoint}/category/${id}`,{
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
            getAllCategory();
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
                    <Link to={"/BlossomCafeFINAL/public/category"} className='btn btn-secondary mb-2 float-end'>
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
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        categoriesF.length > 0 ? (
                                            categoriesF.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.nameCategory}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <Link to={`/BlossomCafeFINAL/public/categories/edit/${item.id}`} className="btn btn-success me-2">
                                                        <FiEdit />
                                                        </Link>
                                                        <Link to= {`/BlossomCafeFINAL/public/categories/view/${item.id}`} className='btn btn-primary me-2'><HiViewGrid /></Link>

                                                        <Button variant='danger' onClick={() => deleteCategory(item.id)}>
                                                        <MdDelete />
                                                        </Button>
                                                    </td>

                                                </tr>

                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={'3'}>No Category found</td>
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

export default ShowCategory