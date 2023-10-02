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


const endpoint = 'http://localhost/BlossomCafeFINAL/public/api';

const ShowSale = () => {
//const {token} = useContext(AuthContext);
const token = localStorage.getItem('token');

    const [sale, setSale] = useState([]);

    useEffect(() => {
        getAllSales();
    }, [])

    const getAllSales = async () => {
        await axios.get(`${endpoint}/sales`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setSale(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const deleteSale = async (id) => {
        const isConfirm = await Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            return result.isConfirmed
        })
        if (!isConfirm) {
            return;
        }

        await axios.delete(`${endpoint}/sale/${id}`,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            getAllSales();
        }).catch(({ response: { data } }) => {
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
                        <Link className='btn btn-secondary mb-2 float-end' to={"/BlossomCafeFINAL/public/sales/create"}>
                            <MdAddCircle />Create
                        </Link>
                    </div>
                    <div className="col-12">
                        <div className="card card-body">
                            <div className="table-responsive">
                                <div className="table table table-bordered mb-0 text-center table-responsive">
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <td>Date</td>
                                                <td>Taxes</td>
                                                <td>Total</td>
                                                <td>Status</td>
                                                <td>Client</td>
                                                <td>User</td>
                                                <td>Voucher</td>

                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sale.length > 0 ? (
                                                    sale.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.date_time}</td>
                                                            <td>{item.taxes}</td>
                                                            <td>{item.total}</td>
                                                            <td>{item.status}</td>
                                                            <td>{item.clientsName}</td>
                                                            <td>{item.userName}</td>
                                                            <td>{item.voucherName}</td>
                                                            <td>
                                                                <Link to={`/BlossomCafeFINAL/public/sale/update/${item.id}`} className="btn btn-success me-2">
                                                                    <FiEdit />
                                                                </Link>
                                                                <Link to={`/BlossomCafeFINAL/public/sale/view/${item.id}`} className='btn btn-primary me-2'><HiViewGrid /></Link>

                                                                <Button variant='danger' onClick={() => deleteSale(item.id)}>
                                                                    <MdDelete />
                                                                </Button>
                                                            </td>

                                                        </tr>

                                                    ))
                                                ) : (
                                                    <>
                                                        <tr>
                                                            <td colSpan={'8'}>No Sale found</td>
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

export default ShowSale