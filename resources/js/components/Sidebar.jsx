import React, {useContext} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, Link as Nv} from '@material-ui/core'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../assets/blossom_white.png';
import { FaHome, FaCoffee, FaUsers } from 'react-icons/fa';
import { BiDetail, BiLogOut } from 'react-icons/bi';
import { MdMenuBook, MdRestaurantMenu, MdPointOfSale } from 'react-icons/md';


function Sidebar() {
  const btnstyle={margin:'8px 0', backgroundColor:'#000000', color: 'white'}

  const navigate = useNavigate();
  
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    navigate("/BlossomCafeFINAL/public");
  };

  return (
    <>
      <Navbar expand={false} bg="dark" variant="dark" >
        <Container fluid>
          <Navbar.Toggle />
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
          <Navbar.Offcanvas placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <b>Blossom Cafe</b>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to={`/BlossomCafeFINAL/public/dashboard`}><FaHome /> Home</Link>
                <Link to={`/BlossomCafeFINAL/public/categories`}><MdMenuBook /> Categories</Link>
                <Link to={`/BlossomCafeFINAL/public/subcategories`}><MdRestaurantMenu /> Subcategories</Link>
                <Link to={`/BlossomCafeFINAL/public/products`}><FaCoffee /> Products</Link>
                <Link to={`/BlossomCafeFINAL/public/sales`}><MdPointOfSale /> Sales</Link>
                <button onClick={logout} variant="contained" style={btnstyle} fullwidth="true"><BiLogOut /> Logout</button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar