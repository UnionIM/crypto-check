import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={''}>Home</Link>
            <Link to={'/coin'}>Coin</Link>
        </div>
    );
};

export default Navbar;
