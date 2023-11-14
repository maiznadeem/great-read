import React from 'react';
import ReadingListForm from './ReadingListForm';
import { useReadingList } from '../context/ReadingListContext';
import Shelf from './Shelf';

const ReadingList = () => {
    const { readingInfo } = useReadingList();

    return (
        <div className='flex flex-col items-center w-full pt-4 pb-8 sm:py-0 mt-4 sm:mt-8'>
            <div className={`flex flex-col items-center gap-4 ${readingInfo ? 'w-[100%] md:w-[80%] md:max-w-[100%] lg:w-[680px]' : 'max-w-[100%] md:max-w-[600px]'}`}>
                    <p className='manrope-regular text-center text-xl text-black max-w-[600px]'>
                        Your next <span className='text-primaryDark'>career move, inspiration or motivation</span> can be in one of the books you choose to read.
                    </p>
                    <p className='manrope-regular text-center text-xl text-black max-w-[600px]'>
                        What are you waiting for?
                    </p>
                    {readingInfo ? (
                        <Shelf />
                    ) : (
                        <ReadingListForm />
                    )}
            </div>
        </div>
    );
};

export default ReadingList;
