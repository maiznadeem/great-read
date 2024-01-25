import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Header />
            <div className='pt-40 sm:pt-36 max-w-[2300px]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
