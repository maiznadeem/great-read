import React from 'react';

import Logo from '../../assets/logos/Logo.svg';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex items-center justify-center bg-footer py-4 text-white text-center w-full">
            <div className="container mx-auto">
                <img
                    src={Logo}
                    alt="Logo"
                    className="mx-auto h-16 md:h-24 w-auto mb-4"
                />
                <div className='flex flex-col gap-1'>
                    <p className="manrope-regular text-xs text-black"><span className='text-primaryDark manrope-semibold'>Contact Us:</span> contact@great-read.com</p>
                    <p className="manrope-regular text-xs text-black">Copyright &copy; {currentYear}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
