import React from 'react'
import Reader from '../assets/readers/maya.jpg';

import shelf from '../assets/shelf/Shelf.svg'
import shelf1 from '../assets/shelf/Shelf1.jpg'
import shelf2 from '../assets/shelf/Shelf2.jpg'
import shelf3 from '../assets/shelf/Shelf3.jpg'

const Banner = () => {
    return (
        <section className='flex gap-12 my-4 items-center'>
            <div className='w-1/4'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='rounded'>
                        <img
                            src={Reader}
                            alt='Quote'
                            className='h-24 w-auto rounded-full shadow-xl mb-4'
                        />
                    </div>
                    <p className='manrope-regular text-center text-black text-xl'>When I look back, I am so impressed again with the life-giving power of literature. If I were a young person today, trying to gain a sense of myself in the world, I would do that again by reading, just as I did when I was young.</p>
                    <p className='manrope-semibold text-primaryDark mt-4'>Maya Angelou</p>
                </div>
            </div>
            
            <div className='w-3/4'>
                <div className='bg-[#EFE5D8] rounded-xl shadow-xl px-6 py-10 relative'>
                    <div className='flex items-center justify-between gap-8 h-full'>
                        <div className='flex flex-col gap-3 items-start justify-center w-1/3'>
                            <p className='text-5xl text-black'><span className='text-primaryDark'>Think</span> Better.</p>
                            <p className='text-5xl text-black'><span className='text-primaryDark'>Be</span> Better.</p>
                            <p className='text-5xl text-black'><span className='text-primaryDark'>Do</span> Better.</p>
                            <p className='text-lg text-black'>The <span className='text-primaryDark'>internet's largest library</span> with a focus on genres that inspire you. A central point to find books in areas that matter the most to you.</p>
                        </div>
                        
                        <div className='flex flex-col gap-3 items-center justify-center w-2/3'>
                            <div className='absolute top-[70%]'>
                                <div className='w-[80%] mx-auto relative xl:w-[500px]'>
                                    <img className='shadow-xl' src={shelf} alt='Shelf' />
                                    <div className='absolute bottom-1/2 flex items-end justify-center gap-4'>
                                        <img src={shelf1} alt='Shelf' className='h-auto rounded-xl w-1/3' />
                                        <img src={shelf2} alt='Shelf' className='h-auto rounded-lg w-1/4' />
                                        <img src={shelf3} alt='Shelf' className='h-auto rounded-md w-1/5' />
                                    </div>
                                </div>
                                <p className='manrope-semibold text-2xl py-4 text-center text-black'>Picks for June 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
