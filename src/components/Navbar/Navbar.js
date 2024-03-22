import React, { useState } from 'react';
import logo from '../../images/logo.png';

import './navbar.css';
const Navbar = ({userName}) => {
    const [menuToggle, setMenuToggle] = useState(false);

    const toggleMenu = () => {
        setMenuToggle(prevState => !prevState);
    };

    return (
        <nav id="navbar" className="">
            <div className="nav-wrapper">
                {/* Navbar Logo */}
                <div className="logo">
                    {/* Logo Placeholder for Illustration */}
                    <img src={logo} alt="logo" className='logo' />
                </div>

                {/* Navbar Links */}
                <ul id="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/Predict">Yield Predict</a></li>
                    <li><a href="/CropRecommend">Crop recommend</a></li>
                    &nbsp;
                    <span>{userName}</span>    
                    <li><a href="/login">| Sign Out</a></li>
                </ul>
            </div>

            {/* Menu Icon */}
            <div className="menuIcon" onClick={toggleMenu}>
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>

            {/* Overlay Menu */}
        </nav>
    );
};

export default Navbar;
