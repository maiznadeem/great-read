import React from 'react'

import waves from '../assets/backgrounds/waves.png';
import linear from '../assets/backgrounds/linear.png';
import { useReadingList } from '../context/ReadingListContext';

const Shelf = () => {

    const { name, goal, period, books } = useReadingList();

    return (
        <div className='bg-footer py-3 px-6 sm:py-3 sm:px-8 rounded-xl w-full' style={{
            background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${linear}), url(${waves})`,
            backgroundSize: 'cover, auto 100%, cover',
            backgroundPosition: 'center, right, center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className='flex flex-col items-center gap-4 sm:gap-6 py-4 sm:py-8'>
                <p className='manrope-semibold text-center text-xl sm:text-2xl text-black'>{name}'s Reading List</p>
                <div>
                    <p className='manrope-semibold text-center text-lg sm:text-xl text-primary'>{books.length} out of {goal == 1? "1 book" : `${goal} books`} chosen for your</p>
                    <p className='manrope-semibold text-center text-lg sm:text-xl text-primary'>reading goal for {period}</p>
                </div>
                <div className='w-full flex justify-center items-center bg-footer border-2 border-gray-400 border-dashed rounded-xl min-h-[200px]'>
                    {books.length == 0 ? (
                        <p className='text-lg sm:text-xl manrope-regular text-gray-400'>Add books to your shelf</p>
                    ) : (
                        <p>{books}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shelf