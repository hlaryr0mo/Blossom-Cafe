import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from "../../Auth/AuthContext";

const endpoint = 'http://localhost/BlossomCafeFINAL/public/api/sale/'


const ViewSale = props => {
    //const {token} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [inputs, setInputs]= useState({})
    const {id}= useParams()
    

    useEffect(()=>{
        const getSaleById= async()=>{
            const response = await axios.get(`${endpoint}${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setInputs({
                date_time:response.data.date_time,
                taxes:response.data.taxes,
                total:response.data.total,
                status:response.data.status,
                client_id:response.data.client_id,
                user_id:response.data.user_id,
                voucher_id:response.data.voucher_id,
            })
            
        }
        getSaleById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div>
            <h2>View Sale</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h2>Date</h2>
                        <p>{inputs.date_time}</p>
                        <h2>Taxes</h2>
                        <p>{inputs.taxes}</p>
                        <h2>Total</h2>
                        <p>{inputs.total}</p>
                        <h2>Status</h2>
                        <p>{inputs.status}</p>
                        <h2>Client</h2>
                        <p>{inputs.client_id}</p>
                        <h2>User</h2>
                        <p>{inputs.user_id}</p>
                        <h2>Voucher</h2>
                        <p>{inputs.voucher_id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
 
}

ViewSale.propTypes = {}

export default ViewSale