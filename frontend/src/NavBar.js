import React from 'react';
import { NavLink , useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const NavBar = () => {
    const history = useHistory();
    const loggedIn = localStorage.getItem('username');
    if(!loggedIn || loggedIn === ''){
    return (
        <div>
            <Navbar collapseOnSelect expand = 'md' bg='warning' style={{'--bs-bg-opacity': '.5;'}}  >
              
                    <Navbar.Brand href = '/'><h1>Foodly</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls = 'responsive-narbar-nav' />
                    <Navbar.Collapse id = 'responsive-navbar-nav' className="justify-content-end">
            <Nav variant="pills" defaultActiveKey="/" onSelect = {(selectedKey) => history.push(`${selectedKey}`)}>
            <Nav.Item>
        <Nav.Link eventKey="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="/login">Log In</Nav.Link>
             </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey='/signup'>Sign Up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey='/recipe_search'>Recipe Search</Nav.Link>
        </Nav.Item>
            </Nav>
            </Navbar.Collapse>
           
            </Navbar>
        </div>
    )
    }

    return (
        <div>
            <Navbar collapseOnSelect expand = 'md' bg='warning' style={{'--bs-bg-opacity': '.5;'}}>
                <Navbar.Brand href = '/'><h1>Foodly</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls = 'responsive-navbar-nav' />
                <Navbar.Collapse id = 'responsive-navbar-nav' className='justify-content-end'>
            <Nav variant = 'pills' defaultActiveKey = "/" onSelect = {(selectedKey) => history.push(`${selectedKey}`)}>
                <Nav.Item>
                    <Nav.Link eventKey = '/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey = '/recipe_search'>Recipe Search</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey = '/edit_profile'>Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey = {`/${loggedIn}/profile`}>{`${loggedIn}`}'s Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey = '/logout'>Log Out</Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            {/* <NavLink exact to = '/'>
                Home
            </NavLink>
            <NavLink exact to='/recipe_search'>
                Recipe Search
            </NavLink>
            <NavLink exact to = '/edit_profile'>
                Edit Profile
            </NavLink>
            <NavLink exact to = {`/${loggedIn}/profile`}>
                {`${loggedIn}'s Profile`}
            </NavLink>
            <NavLink exact to = '/logout'>
                Log Out
            </NavLink> */}
        </div>
    )
}

export default NavBar