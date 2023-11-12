import React, { useState, useEffect } from 'react';
import { getRandomNotes } from '../utils/api';
import NotesSlider from '../components/NotesSlider';

const Notes = () => {
    const [shuffledNotes, setShuffledNotes] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1);

    const handleCurrentSlideChange = (newValue) => {
        setIsShuffling(true);
        setCurrentSlide(newValue);
    };

    useEffect(() => {
        const abortController = new AbortController();
        getRandomNotes(currentSlide, {
            signal: abortController.signal,
        })
        .then(async data => {
            return data;
        })
        .then(
            result => {
                if (abortController.signal.aborted) {
                    return;
                }
                setShuffledNotes(result);
                setIsShuffling(false);
            },
            e => console.warn('fetch failure', e),
        )
        return () => {
            abortController.abort();
        };
    }, [currentSlide]);

    return (
        <section className='mt-6 sm:mt-12 sm:my-14 mx-4 sm:mx-8 min-h-[80vh]'>
            <div className='flex flex-col gap-8 items-center justify-center w-full'>
                <div className='flex flex-col gap-4 items-center w-full'>
                    <div className='flex max-w-[800px]'>
                        <p className='manrope-regular text-center text-xl sm:text-2xl text-black'>
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
                <NotesSlider currentSlide={currentSlide} setCurrentSlide={handleCurrentSlideChange} isShuffling={isShuffling} />
                <div className='w-full flex flex-wrap justify-center gap-12 p-12 pt-4'>
                    {shuffledNotes.map((note, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-center min-w-[300px] min-h-[300px] p-4 border rounded-lg shadow-lg bg-[#EFE5D857] transition-opacity duration-300 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
                            style={{
                                maxWidth: '300px',
                            }}
                        >
                            <div className='flex flex-col items-center justify-center h-full'>
                                <p className='manrope-regular text-lg text-center text-black'>{note?.note}</p>
                            </div>
                            <p className='manrope-semibold text-xs text-center text-primary'>- {note?.book.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Notes;
