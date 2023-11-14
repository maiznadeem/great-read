import React, { useState, useEffect } from 'react';
import { getRandomNotes } from '../utils/api';
import NotesSlider from '../components/NotesSlider';
import BookmarkCard from '../components/BookmarkCard';

const Notes = () => {
    const [shuffledNotes, setShuffledNotes] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [resetFlip, setResetFlip] = useState(false);

    const handleCurrentSlideChange = (newValue) => {
        if (currentSlide == newValue)
            return;
        setIsShuffling(true);
        setResetFlip((prev) => !prev);
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
                    <div className='flex max-w-[600px]'>
                        <p className='manrope-regular text-center text-xl text-black'>
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
                <div className='w-full flex flex-wrap justify-center gap-12 p-12 pt-4 min-h-[600px]'>
                    {shuffledNotes.map((note, index) => (
                        <BookmarkCard key={index} note={note} isShuffling={isShuffling} resetFlip={resetFlip} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Notes;
