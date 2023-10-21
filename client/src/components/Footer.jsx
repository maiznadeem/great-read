import React from 'react';

import Logo from '../assets/logos/Logo.svg';

const Footer = () => {
    return (
        <footer className="flex items-center justify-center bg-footer py-4 text-white text-center w-full">
            <div className="container mx-auto">
                <img
                    src={Logo}
                    alt="Logo"
                    className="mx-auto h-16 md:h-24 w-auto mb-4"
                />
                <p className="manrope-regular text-xs text-black">Copyright @2023. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
