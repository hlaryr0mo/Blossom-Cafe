import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className='d-grid gap-2'>
                            <Link to="/BlossomCafeFINAL/public/categories" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Categories</Link>
                            <Link to="/BlossomCafeFINAL/public/subcategories" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Subategories</Link>

                        </div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;


