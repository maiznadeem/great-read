import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';

import amazonIcon from '../../assets/links/amazon.png';
import perlegoIcon from '../../assets/links/perlego.png';
import invertedLeft from '../../assets/links/inverted-comma-left.svg';
import invertedrRight from '../../assets/links/inverted-comma-right.svg';

const ExampleNote = ({ book }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const categoryIcons = book.categories.map((category, index) => {
        const [showtooltip, setshowtooltip] = useState(false)
        return (
            <Tooltip 
                key={index}
                title={category.name}
                open={showtooltip}
                TransitionComponent={Zoom}
                onOpen={() => setshowtooltip(true)}
                onClose={() => setshowtooltip(false)}
            >
                <img
                    src={category.image}
                    onClick={() => setshowtooltip(!showtooltip)}
                    className="w-auto h-6 cursor-pointer"
                />
            </Tooltip>
        );
    });

    return (
        <div className="rounded-lg p-4 flex flex-col border-2 border-gray-400 border-dashed overflow-visible relative">
            <div className='flex flex-row gap-4'>
                <div className={`w-40 h-60 relative rounded-lg shadow-xl -mt-16 -ml-10 overflow-hidden`}
                >
                    { !isImageLoaded && 
                        <Skeleton 
                            variant="rectangular"
                            animation="wave"
                            width={160}
                            height={240}
                            sx={{ bgcolor: '#f0f0f0' }}
                        />
                    }
                    <img
                        src={book.image}
                        alt={book.title}
                        onLoad={handleImageLoad}
                        className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out`}
                    />
                </div>
                <div className='flex justify-center items-center w-[70%]'>
                    <img className='absolute -top-4 left-32' src={invertedLeft} alt='Inverted-Left' />
                    <img className='absolute bottom-14 -right-4' src={invertedrRight} alt='Inverted-Right' />
                    <p className="manrope-regular text-gray-600 text-sm">{book.quote}</p>
                </div>
            </div>
            <div className='flex mt-4 justify-between'>
                <div className="flex space-x-4">
                    {categoryIcons}
                </div>
                <div className="flex space-x-2 items-center">
                    { book.amazon &&  <img
                        src={amazonIcon}
                        alt="Amazon"
                        className="w-auto h-4 cursor-pointer hover:tooltip"
                        title="Amazon"
                        onClick={() => {window.open(book.amazon, '_blank')}}
                    />}
                    { book.perlego && <img
                        src={perlegoIcon}
                        alt="Perlego"
                        className="w-auto h-4 cursor-pointer hover:tooltip"
                        title="Perlego"
                        onClick={() => {window.open(book.perlego, '_blank')}}
                    />}
                </div>
            </div>
        </div>
    );
}

export default ExampleNote