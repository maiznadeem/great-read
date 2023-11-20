import React, { useState, useEffect } from 'react';
import { getTopPicks } from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Skeleton } from '@mui/material';
import TopPickCarousel from './TopPickCarousel';
import TopPickCard from './TopPickCard';

const TopPickImage = ( {book} ) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    return (
        <div className='h-48 w-32 rounded-lg overflow-hidden'>
            { !isImageLoaded && <Skeleton variant="rectangular" className='w-full h-full absolute inset-0' sx={{ bgcolor: '#f0f0f0' }} animation="wave" /> }
            <img
                src={book.image}
                className='w-full h-full object-cover'
                onLoad={() => setIsImageLoaded(true)}
            />
        </div>
    )
}

const Banner = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [topPicks, setTopPicks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const getMonthName = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
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

    let cards = [
        {
            key: 1,
            content: (
                <TopPickCard book={topPicks?.books[0]} />
            )
        },
        {
            key: 2,
            content: (
                <TopPickCard book={topPicks?.books[1]} />
            )
        },
        {
            key: 3,
            content: (
                <TopPickCard book={topPicks?.books[2]} />
            )
        },
    ]

    return (
        <section className='flex mt-4 justify-center items-center'>
            {isLoading ? (
                <div className='text-center flex items-center justify-center min-h-[60vh] w-full'>
                    <CircularProgress sx={{ color: '#8D5E20' }} />
                </div>
            ) : (
            <>
                <div className='w-full'>
                    <div className=''>
                        <p className='manrope-semibold text-2xl sm:text-3xl text-black'>
                            <span className='text-primaryDark'>Think</span> Better.
                            <span className='text-primaryDark'> Be</span> Better.
                            <span className='text-primaryDark'> Do</span> Better.
                        </p>
                        <p className='manrope-semibold text-lg sm:text-xl text-black'>
                            The internet's<span className='text-primaryDark'> largest </span>destination for <span className='text-primaryDark'>non-fiction books</span> that {windowWidth <= 1300 && windowWidth >= 1150 ? <br /> : <></>} will inspire you.
                        </p>
                    </div>
                    <div className='flex gap-4 w-full'>
                        <div className='w-full bg-[#EFE5D8] rounded-xl shadow-xl mb-10 sm:mb-0 px-6 sm:px-12 py-6 sm:py-20 relative'>
                        
                        </div>
                        <div className='flex justify-center items-center flex-col w-[100%] bg-[#EFE5D8] rounded-xl shadow-xl mb-10 sm:mb-0 px-4 sm:px-8 py-2 sm:py-4 relative'>
                            <div className='flex justify-center items-center w-[100%] max-w-[500px]'>
                                <TopPickCarousel
                                    cards={cards}
                                    height="300px"
                                    width="80%"
                                    margin="0 auto"
                                    showArrows={false}
                                />
                            </div>
                            <p className='manrope-semibold text-2xl py-4 text-center text-black'>
                                Picks for {getMonthName(topPicks?.date.month)} {topPicks?.date.year}
                            </p>
                        </div>
                        <div className='w-full bg-[#EFE5D8] rounded-xl shadow-xl mb-10 sm:mb-0 px-6 sm:px-12 py-6 sm:py-20 relative'>
                        
                        </div>
                    </div>
                </div>
            </>
            )}
        </section>
    );
};

export default Banner;
