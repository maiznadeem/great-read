import React, { useState, useEffect } from 'react';
import Logo from '../assets/logos/logo.svg';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-backgroundPrimary ${
                isScrolled ? 'px-8 py-4 shadow-md' : 'py-8 px-8'
            } transition-all duration-300 ease-in-out z-10 border-b-2 border-primary`}
        >
            <div className="flex justify-between items-center">
                <a href="#" className="text-white font-bold text-lg">
                    <img
                        src={Logo}
                        alt="Logo"
                        className={`transition-all duration-300 transform ${
                            isScrolled ? 'h-10 max-h-96' : 'h-20 max-h-96'
                        }`}
                    />
                </a>
                <button className="manrope-semibold bg-primary text-white py-2 px-12 rounded-xl shadow-lg hover:bg-primaryDark">
                    Connect The Dots
                </button>
            </div>
        </header>
    );
};

export default Header;
