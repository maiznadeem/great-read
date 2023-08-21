import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Logo from '../assets/logos/logo.svg'

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
        <Container>
            <header
            className={`fixed top-0 left-0 w-full bg-backgroundPrimary ${
                isScrolled ? 'py-2 px-8' : 'py-4 px-8'
            } transition-all duration-300 ease-in-out z-10`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-white font-bold text-lg">
                    <img
                        src={Logo}
                        alt="Logo"
                        className={`h-8 max-h-12 transition-transform duration-300 transform ${
                        isScrolled ? 'scale-75' : 'scale-100'
                        } hover:scale-50`}
                    />
                    </a>
                    <button className="manrope-semibold bg-primary text-white py-2 px-4 rounded-xl shadow-lg hover:bg-primaryDark">
                    Button
                    </button>
                </div>
            </header>
        </Container>
    );
};

export default Header;
