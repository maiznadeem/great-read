import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logos/Logo.svg';

const Header = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true); // Initialize isAtTop as true
    const location = useLocation();

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollTop > lastScrollTop) {
                setIsHidden(true);
                setIsAtTop(false);
            } else if (currentScrollTop === 0) {
                setIsAtTop(true);
            } else {
                setIsHidden(false);
            }
            lastScrollTop = currentScrollTop;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const buttonText = location.pathname === '/' ? 'Notes' : 'Homepage';
    const buttonLink = location.pathname === '/' ? '/notes' : '/';

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-backgroundPrimary ${
                isHidden ? 'transform translate-y-[-80px]' : 'px-4 sm:px-8 py-4 border-primary'
            } ${ isAtTop ? '' : 'border-b-2 border-primary shadow-md' } transition-all duration-300 ease-in-out z-10`}
        >
            {isAtTop && (
                <div className="absolute w-2/4 border-b-[3px] border-primary" style={{ bottom: '0' }}></div>
            )}
            <div className="flex justify-between items-center">
                <Link to='/' className="text-white font-bold text-lg">
                    <img
                        src={Logo}
                        alt="Logo"
                        className={`transition-all duration-300 transform 
                            ${ isHidden ? 'h-0' : '' } 
                            ${ !isHidden && !isAtTop ? 'h-16' : '' }
                            ${ !isHidden && isAtTop ? 'h-32 sm:h-36 max-h-96' : '' }`
                        }
                    />
                </Link>
                <div className='flex flex-col gap-1 sm:gap-2'>
                    <div className={`flex gap-1 sm:gap-2 ${ !isAtTop ? 'flex-row' : 'flex-col' } justify-center items-end sm:flex-row`}>
                        <button className="manrope-semibold bg-primary text-white text-[10px] py-[6px] px-[10px] rounded-md sm:px-6 sm:text-[14px] w-24 sm:w-36 sm:rounded-md shadow-lg hover:bg-primaryDark">
                            Reading List
                        </button>
                        <button className="manrope-semibold bg-primary text-white text-[10px] py-[6px] px-[10px] rounded-md sm:px-6 sm:text-[14px] w-24 sm:w-36 sm:rounded-md shadow-lg hover:bg-primaryDark">
                            <NavLink to={buttonLink}>{buttonText}</NavLink>
                        </button>
                    </div>
                    { isAtTop &&
                        <p className='font-sugarcane text-black text-2xl sm:text-5xl flex justify-center'>Bookmark your best self</p>
                    }
                    </div>
            </div>
        </header>
    );
};

export default Header;
