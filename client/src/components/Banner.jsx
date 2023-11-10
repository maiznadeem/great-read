import React, { useState, useEffect } from 'react';
import shelf from '../assets/shelf/Shelf.png';
import { getTopPicks } from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const Banner = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [topPicks, setTopPicks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMonthName = (monthNumber) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[monthNumber - 1];
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topPicksData = await getTopPicks();
                setTopPicks(topPicksData);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const common = () => {
        return (
            <>
                <div className='mx-auto relative w-[90%] lg:max-w-[450px]'>
                    <img className='shadow-xl' src={shelf} alt='Shelf' />
                    <div className='absolute bottom-1/2 flex items-end justify-center gap-4'>
                        <img
                            src={topPicks?.books[0]?.image || ''}
                            alt='Shelf'
                            className='h-auto rounded-lg w-1/3'
                        />
                        <img
                            src={topPicks?.books[1]?.image || ''}
                            alt='Shelf'
                            className='h-auto rounded-lg w-1/4'
                        />
                        <img
                            src={topPicks?.books[2]?.image || ''}
                            alt='Shelf'
                            className='h-auto rounded-md w-1/5'
                        />
                    </div>
                </div>
                <p className='manrope-semibold text-2xl py-4 text-center text-black'>
                    Picks for {getMonthName(topPicks?.date.month)} {topPicks?.date.year}
                </p>
            </>
        )
    }

    return (
        <section className='flex mt-4 justify-center items-center'>
            {isLoading ? (
                <div className='text-center flex items-center justify-center min-h-[60vh] w-full'>
                    <CircularProgress sx={{ color: '#8D5E20' }} />
                </div>
            ) : (
            <>
                <div className='md:w-[90%] lg:w-[60%]'>
                    <div className='bg-[#EFE5D8] rounded-xl shadow-xl mb-10 sm:mb-0 px-6 sm:px-12 py-6 sm:py-20 relative'>
                        <div className='flex flex-col md:flex-row items-center justify-between sm:gap-8'>
                            <div className='flex flex-col gap-1 items-start justify-center w-full md:w-[40%]'>
                                <p className='manrope-semibold text-2xl sm:text-3xl text-black'>
                                    <span className='text-primaryDark'>Think</span> Better.
                                </p>
                                <p className='manrope-semibold text-2xl sm:text-3xl text-black'>
                                    <span className='text-primaryDark'>Be</span> Better.
                                </p>
                                <p className='manrope-semibold text-2xl sm:text-3xl text-black'>
                                    <span className='text-primaryDark'>Do</span> Better.
                                </p>
                                <p className='manrope-semibold text-lg sm:text-xl text-black'>
                                    The internet's<span className='text-primaryDark'> largest </span>destination for <span className='text-primaryDark'>non-fiction books</span> that {windowWidth <= 1300 && windowWidth >= 1150 ? <br /> : <></>} will inspire you.
                                </p>
                            </div>
                            <div className='flex flex-col gap-3 items-center justify-center w-full md:w-[60%]'>
                                { windowWidth > 768 ? (
                                    <div className='absolute top-[65%]'>
                                        {common()}
                                    </div>
                                ) : (
                                    <div className='mt-[50%]'>
                                            {common()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )}
        </section>
    );
};

export default Banner;
