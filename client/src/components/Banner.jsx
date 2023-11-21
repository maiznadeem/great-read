import React, { useState, useEffect } from 'react';
import { getTopPicks } from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import TopPickCarousel from './TopPickCarousel';
import TopPickCard from './TopPickCard';

const Banner = () => {
    const [topPicks, setTopPicks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const getMonthName = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
        ];
        return months[monthNumber - 1];
    };

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
                <div className='w-[100%] sm:w-[85%] flex flex-col items-center'>
                    <div className='flex flex-col items-center gap-4 pb-6'>
                        <p className='manrope-semibold text-2xl sm:text-3xl text-black text-center max-w-[500px]'>
                            <span className='text-primaryDark'>Think</span> Better.
                            <span className='text-primaryDark'> Be</span> Better.
                            <span className='block sm:inline'><span className='text-primaryDark'> Do</span> Better.</span>
                        </p>
                        <p className='manrope-semibold text-lg sm:text-xl text-black text-center max-w-[400px]'>
                            The internet's<span className='text-primaryDark'> largest </span>destination for <span className='text-primaryDark'>non-fiction books</span> that will inspire you.
                        </p>
                    </div>
                    <div className='flex w-full justify-between gap-4 flex-wrap lg:flex-nowrap'>
                        <div className='w-full md:w-full lg:w-1/3 flex flex-col justify-around items-start bg-[#EFE5D8] rounded-xl shadow-xl relative px-6 sm:px-12 py-6 sm:py-8'>
                            <p className='manrope-semibold text-3xl text-black'>
                                Insights & Ideas
                            </p>
                            <p className='manrope-semibold text-lg sm:text-xl py-4 text-black max-w-[400px]'>
                                Access notes containing key ideas, insights and concepts from over 3,000 books for a <span className='text-primaryDark'>fraction of the time and money </span> to read all of them.
                            </p>
                            <div className='w-full flex justify-center'>
                                <button
                                    className="manrope-semibold bg-primary text-white py-[6px] px-6 text-[14px] w-36 rounded-md shadow-lg hover:bg-primaryDark"
                                >
                                    I'm in!    
                                </button>
                            </div>
                        </div>
                        <div className='w-full lg:w-1/3 flex flex-col justify-center items-center bg-[#EFE5D8] rounded-xl shadow-xl px-4 sm:px-8 py-2 sm:py-8 relative -order-last lg:-order-none'>
                            <p className='manrope-semibold text-3xl py-4 text-center text-black'>
                                Top 3 Picks
                            </p>
                            <div className='flex justify-center items-center w-[100%] max-w-[500px] scale-75'>
                                <TopPickCarousel
                                    cards={cards}
                                    height="200px"
                                    width="80%"
                                    margin="0 auto"
                                    showArrows={false}
                                />
                            </div>
                            <p className='manrope-semibold text-2xl py-4 text-center text-black'>
                                Picks for {getMonthName(topPicks?.date.month)} {topPicks?.date.year}
                            </p>
                        </div>
                        <div className='w-full md:w-full lg:w-1/3 flex flex-col justify-around items-start bg-[#EFE5D8] rounded-xl shadow-xl relative px-6 sm:px-12 py-6 sm:py-8'>
                            <p className='manrope-semibold text-3xl text-black'>
                                Reading List
                            </p>
                            <p className='manrope-semibold text-lg pt-4 pb-1 sm:text-xl text-black'>
                                Your next <span className='text-primaryDark'>career move, inspiration or motivation</span> can be in one of the books you choose to read.
                            </p>
                            <p className='manrope-semibold text-lg pb-4 pt-1 sm:text-xl text-black'>
                                What are you waiting for?
                            </p>
                            <div className='w-full flex justify-center'>
                                <button
                                    className="manrope-semibold bg-primary text-white py-[6px] px-6 text-[14px] w-36 rounded-md shadow-lg hover:bg-primaryDark"
                                >
                                    Start    
                                </button>
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
