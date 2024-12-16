// NavBar.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../Components/Assets/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { authenticationActions } from '../Redux/store';

const NavBar = () => {
    const [value, setValue] = useState();
    const isLogin = useSelector(state => state.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        try {
            dispatch(authenticationActions.logout());
            alert('Logged Out Successfully!!');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar className="navbar-custom" expand="lg">
            <Container>
                {isLogin && (
                    <>
                        <Navbar.Brand as={Link} to="/">
                            <img src={logo} alt="Your Logo" className="navbar-logo" />
                        </Navbar.Brand>

                        <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link
                                    as={Link}
                                    to="/landing"
                                    className={`nav-link-custom ${location.pathname === '/landing' ? 'active' : ''}`}
                                >
                                    Main
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/explore"
                                    className={`nav-link-custom ${location.pathname === '/explore' ? 'active' : ''}`}
                                >
                                    Explore
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/gallery"
                                    className={`nav-link-custom ${location.pathname === '/gallery' ? 'active' : ''}`}
                                >
                                    Gallery
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/services"
                                    className={`nav-link-custom ${location.pathname === '/services' ? 'active' : ''}`}
                                >
                                    Services
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/profile"
                                    className={`nav-link-custom ${location.pathname === '/profile' ? 'active' : ''}`}
                                >
                                    Profile
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link
                                    onClick={handleLogout}
                                    as={Link}
                                    to="/"
                                    className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
                                >
                                    LogOut
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default NavBar;
