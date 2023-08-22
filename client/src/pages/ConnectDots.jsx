import React, { useState, useEffect } from 'react';
import famousQuotes from '../utils/famousQuotes';

const ConnectDots = () => {
    const [shuffledQuotes, setShuffledQuotes] = useState(famousQuotes.slice(0, 12));
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleQuotes = () => {
        if (!isShuffling) {
            setIsShuffling(true);

            const quotesCopy = [...famousQuotes];
            for (let i = quotesCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [quotesCopy[i], quotesCopy[j]] = [quotesCopy[j], quotesCopy[i]];
            }

            setTimeout(() => {
                setShuffledQuotes(quotesCopy.slice(0, 12));
                setIsShuffling(false);
            }, 500);
        }
    };

    useEffect(() => {
        setIsShuffling(false);
    }, []);

    return (
        <section className='mb-24 mt-44 mx-8'>
            <div className='flex flex-col gap-8 items-center justify-center w-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col gap-4 max-w-[800px]'>
                        <p className='manrope-semibold text-3xl text-black'>Connect The Dots</p>
                        <p className='manrope-regular text-2xl text-black'>
                            A collection of more than <span className='text-primaryDark'>10,000</span> interesting insights, ideas, and concepts from over 3000+ books.
                        </p>
                    </div>
                </div>
                <button
                    className={`w-full flex justify-center items-center max-w-[400px] manrope-semibold bg-[#FFA500] text-white py-2 px-12 rounded-xl shadow-lg hover:bg-[#ff9900] transition-all ${isShuffling ? 'pointer-events-none' : ''}`}
                    onClick={shuffleQuotes}
                >
                    Shuffle
                </button>
                <div className='w-full flex flex-wrap justify-center gap-12 p-12 pt-4'>
                    {shuffledQuotes.map((quote, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-center min-w-[300px] min-h-[300px] p-4 border rounded-lg shadow-lg bg-[#EFE5D857] transition-opacity duration-500 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
                            style={{
                                flex: '1 1 30%',
                                maxWidth: '45%',
                            }}
                        >
                            <p className='manrope-regular text-lg text-center text-black'>"{quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConnectDots;
