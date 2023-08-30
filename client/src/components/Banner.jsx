import React, { useState, useEffect } from 'react';
import shelf from '../assets/shelf/Shelf.svg';
import { getTopPicks, getQuotes } from '../utils/api';
import { ClipLoader } from 'react-spinners';

const Banner = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [topPicks, setTopPicks] = useState(null);
    const [quotes, setQuotes] = useState([]);
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

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topPicksData = await getTopPicks();
                setTopPicks(topPicksData);

                const quotesData = await getQuotes();
                setQuotes(quotesData);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const quoteRotationInterval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) =>
                    prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
                );
                setFadeIn(true);
            }, 1000);
        }, 10000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(quoteRotationInterval);
        };
    }, [quotes]);
    const currentQuote = quotes.length > 0 ? quotes[currentQuoteIndex] : null;


    return (
        <section className='flex gap-12 mt-4 items-center flex-col-reverse lg:flex-row'>
            {isLoading ? (
                <div className='text-center flex items-center justify-center min-h-[70vh] w-full'>
                    <ClipLoader color={'#8D5E20'} loading={isLoading} size={50} />
                </div>
            ) : (
                <>
                    {currentQuote && (
                        <div className={`md:w-[600px] lg:w-1/4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='rounded'>
                                    <img
                                        src={currentQuote.image}
                                        alt={currentQuote.author}
                                        className='h-24 w-auto rounded-full shadow-xl mb-4'
                                    />
                                </div>
                                <p className='manrope-regular text-center text-black text-md'>
                                    {currentQuote.quote}
                                </p>
                                <p className='manrope-semibold text-primaryDark mt-4'>
                                    {currentQuote.author}
                                </p>
                            </div>
                        </div>
                    )}

            {screenWidth > 768 && (
                <div className='lg:w-3/4'>
                    <div className='bg-[#EFE5D8] rounded-xl shadow-xl px-6 py-10 relative'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-8 h-full'>
                            <div className='flex flex-col gap-3 items-start justify-center w-full md:w-[40%]'>
                                <p className='manrope-semibold text-5xl text-black'>
                                    <span className='text-primaryDark'>Think</span> Better.
                                </p>
                                <p className='manrope-semibold text-5xl text-black'>
                                    <span className='text-primaryDark'>Be</span> Better.
                                </p>
                                <p className='manrope-semibold text-5xl text-black'>
                                    <span className='text-primaryDark'>Do</span> Better.
                                </p>
                                <p className='manrope-semibold text-lg text-black'>
                                    The <span className='text-primaryDark'>internet's largest library</span> with a focus on genres that inspire you. A central point to find books in areas that matter the most to you.
                                </p>
                            </div>

                            <div className='flex flex-col gap-3 items-center justify-center w-full md:w-[60%]'>
                                <div className='absolute top-[70%]'>
                                    <div className='w-[80%] mx-auto relative xl:w-[500px]'>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {screenWidth <= 768 && (
                <div className='lg:w-3/4'>
                    <div className='bg-[#EFE5D8] rounded-xl shadow-xl px-4 py-6 sm:px-6 sm:py-10 relative'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-8 h-full'>
                            <div className='flex flex-col gap-1 sm:gap-3 items-start justify-center w-full md:w-[40%]'>
                                <p className='manrope-semibold text-4xl sm:text-5xl text-black'>
                                    <span className='text-primaryDark'>Think</span> Better.
                                </p>
                                <p className='manrope-semibold text-4xl sm:text-5xl text-black'>
                                    <span className='text-primaryDark'>Be</span> Better.
                                </p>
                                <p className='manrope-semibold text-4xl sm:text-5xl text-black'>
                                    <span className='text-primaryDark'>Do</span> Better.
                                </p>
                                <p className='manrope-semibold text-md sm:text-lg text-black'>
                                    The <span className='text-primaryDark'>internet's largest library</span> with a focus on genres that inspire you. A central point to find books in areas that matter the most to you.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-center justify-center w-full md:w-[60%]'>
                        <div className='mt-[30vh]'>
                            <div className='w-[80%] mx-auto relative xl:w-[500px]'>
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
                        </div>
                    </div>
                </div>
            )}
            </>
            )}
        </section>
    );
};

export default Banner;
