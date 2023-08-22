import React from 'react';

import Logo from '../assets/logos/logo-golden.svg';

const Footer = () => {
    return (
        <footer className="flex items-center justify-center bg-secondary py-12 text-white text-center w-full">
            <div className="container mx-auto">
                <img
                    src={Logo}
                    alt="Logo"
                    className="mx-auto h-8 md:h-16 w-auto mb-4"
                />
                <p className="manrope-regular text-xs text-[#A6A6A6]">Copyright @2023. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
