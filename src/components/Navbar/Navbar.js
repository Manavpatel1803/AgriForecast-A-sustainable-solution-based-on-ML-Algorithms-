import React, { useState } from 'react';
import logoVideo from '../../images/farm.mp4';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar = ({userName}) => {
    const [menuToggle, setMenuToggle] = useState(false);
  const [isBlackMode, setIsBlackMode] = useState(true);

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

    const toggleMenu = () => {
        setMenuToggle(prevState => !prevState);
    };
    const toggleColorMode = () => {
        setIsBlackMode(prevMode => !prevMode);
      };

    return (
        <nav id="navbar" className={isBlackMode ? 'bg-black text-white' : 'bg-white text-black'} style={{height: '200px' }}>
            <div className="nav-wrapper flex justify-between items-center h-full">
                {/* Navbar Logo */}
                <div className="logo h-full ">
                <video autoPlay loop muted className="h-full">
                <source src={logoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
                </div>

                {/* Navbar Links */}
                <ul id="menu" className={`flex items-center ${menuToggle ? 'block' : 'hidden'} md:flex h-full  ml-auto`}>
                    <li className="mr-6"><a className="hover:text-gray-400 text-lg" href="/">Home</a></li>
                    <li className="mr-6"><a className="hover:text-gray-400 text-lg" href="/Predict">Yield Predict</a></li>
                    <li className="mr-6"><a className="hover:text-gray-400 text-lg" href="/CropRecommend">Crop recommend</a></li>
                    <span  className="mr-6 text-lg">{userName}</span>    
                    <li><a className="hover:text-gray-400 text-lg" href="/login">| Sign Out</a></li>
                </ul>
                 <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>

            {/* Menu Icon */}
           
            {/* Toggle Color Mode */}
        <div className="colorModeToggle ml-4 cursor-pointer" onClick={toggleColorMode}>
        {isBlackMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm0 0h0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm0 0h0" />
            </svg>
          )}
        </div>

            </div>
            {/* Overlay Menu */}
        </nav>
        
    );
};

export default Navbar;
