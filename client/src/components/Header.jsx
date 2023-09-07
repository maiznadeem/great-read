import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

import Logo from '../assets/logos/logo.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const buttonText = location.pathname === '/' ? 'Connect The Dots' : 'Homepage';
    const buttonLink = location.pathname === '/' ? '/connectdots' : '/';

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-backgroundPrimary ${
                isScrolled ? 'px-4 sm:px-8 py-4 shadow-md border-b-2 border-primary' : 'header-container py-8 px-4 sm:px-8'
            } transition-all duration-300 ease-in-out z-10`}
        >
            <div className="flex justify-between items-center">
                <Link to='/' className="text-white font-bold text-lg">
                    <img
                        src={Logo}
                        alt="Logo"
                        className={`transition-all duration-300 transform ${
                            isScrolled ? 'h-6 sm:h-10 max-h-96' : 'h-8 sm:h-20 max-h-96'
                        }`}
                    />
                </Link>
                <button className="manrope-semibold bg-primary text-white text-[10px] py-[6px] px-[10px] rounded-lg sm:px-12 sm:text-lg sm:rounded-xl shadow-lg hover:bg-primaryDark">
                    <NavLink to={buttonLink}>{buttonText}</NavLink>
                </button>
            </div>
        </header>
    );
};

export default Header;
