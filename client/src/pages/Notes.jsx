import React, { useState, useEffect } from 'react';
import { getRandomQuotes } from '../utils/api';
import NotesSlider from '../components/NotesSlider';

const Notes = () => {
    const [shuffledQuotes, setShuffledQuotes] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleQuotes = async () => {
        if (!isShuffling) {
            setIsShuffling(true);
            try {
                const quotesData = await getRandomQuotes();
                setShuffledQuotes(quotesData);
                setTimeout(() => {
                    setIsShuffling(false);
                }, 500);
            } catch (error) {
                console.error(error);
                setIsShuffling(false);
            }
        }
    };

    useEffect(() => {
        shuffleQuotes();
    }, []);

    return (
        <section className='mt-6 sm:mt-12 sm:my-14 mx-4 sm:mx-8 min-h-[80vh]'>
            <div className='flex flex-col gap-8 items-center justify-center w-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col gap-4 max-w-[800px]'>
                        <p className='manrope-semibold text-2xl sm:text-3xl text-black'>Reading Reflections</p>
                        <p className='manrope-regular text-xl sm:text-2xl text-black'>
                            A collection of more than <span className='text-primaryDark'>10,000</span> interesting insights, ideas, and concepts from over 3,000+ books.
                        </p>
                    </div>
                </div>
                {/* <button
                    className={`w-full text-md sm:text-xl flex justify-center items-center max-w-[300px] manrope-semibold bg-primary text-white py-2 px-12 rounded-xl shadow-lg hover:bg-primaryDark transition-all ${isShuffling ? 'pointer-events-none' : ''}`}
                    onClick={shuffleQuotes}
                >
                    Shuffle
                </button> */}
                <NotesSlider />
                <div className='w-full flex flex-wrap justify-center gap-12 p-12 pt-4'>
                    {shuffledQuotes.map((quote, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-center min-w-[300px] min-h-[300px] p-4 border rounded-lg shadow-lg bg-[#EFE5D857] transition-opacity duration-500 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
                            style={{
                                maxWidth: '300px',
                            }}
                        >
                            <div className='flex flex-col items-center justify-center h-full'>
                                <p className='manrope-regular text-lg text-center text-black'>{quote?.quote}</p>
                            </div>
                            <p className='manrope-semibold text-xs text-center text-primary'>- {quote?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Notes;
