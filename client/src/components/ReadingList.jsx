import React from 'react'
import ReadingListForm from './ReadingListForm'

const ReadingList = () => {
    return (
        <div className='flex flex-col items-center w-full py-4 sm:py-0'>
            <div className='flex flex-col items-center gap-8 max-w-[800px]'>
                <p className='manrope-regular text-center text-xl sm:text-2xl text-black'>
                    Your next <span className='text-primaryDark'>career move, inspiration or motivation</span> can be in one of the books you choose to read.
                </p>
                <p className='manrope-regular text-center text-xl sm:text-2xl text-black'>
                    What are you waiting for?
                </p>
                <ReadingListForm />
            </div>
        </div>
    )
}

export default ReadingList