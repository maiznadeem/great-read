import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

import amazonIcon from '../assets/links/amazon.png';
import perlegoIcon from '../assets/links/perlego.png';
import invertedLeft from '../assets/links/inverted-comma-left.svg'
import invertedrRight from '../assets/links/inverted-comma-right.svg'
import add from "../assets/buttons/Add.svg";
import remove from "../assets/buttons/Remove.svg";
import tick from "../assets/buttons/tick.png";
import { useReadingList } from '../context/ReadingListContext';

const Book = ({ book, categories }) => {

    const { books, goal, updateBooksValue } = useReadingList();

    const [isBookInReadingList, setIsBookInReadingList] = useState(false);
    const [showCategoryNames, setShowCategoryNames] = useState(false);

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    useEffect(() => {
        setIsBookInReadingList(books.some((readingBook) => readingBook._id === book._id));
        const checkScreenWidth = () => {
            if (window.innerWidth <= 768) {
                setShowCategoryNames(false);
            }
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, [books, book]);

    const toggleCategoryDisplay = () => {
        if (window.innerWidth <= 768) {
            setShowCategoryNames(true);
            setTimeout(() => {
                setShowCategoryNames(false);
            }, 5000);
        }
    };

    const categoryIcons = book.categories.map(category => {
        const matchingCategory = categories.find(item => item.name === category);
        if (matchingCategory && matchingCategory.image) {
            return (
                <img
                    key={matchingCategory._id}
                    src={matchingCategory.image}
                    alt={matchingCategory.name}
                    title={matchingCategory.name}
                    className="w-auto h-6 cursor-pointer hover:tooltip"
                    onClick={toggleCategoryDisplay}
                />
            );
        }
        return null;
    });

    const openLinkInNewTab = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className="rounded-lg p-4 flex flex-col border-2 border-gray-400 border-dashed overflow-visible relative">
            <div className='flex flex-row gap-4'>
                <div className={`w-40 h-60 relative rounded-lg shadow-xl -mt-16 -ml-10 overflow-hidden cursor-pointer ${isBookInReadingList ? 'bg-black' : ''}`}
                    onClick={() => {
                        if (isBookInReadingList) {
                            updateBooksValue(books.filter((readingBook) => readingBook._id !== book._id));
                            setIsBookInReadingList(false);
                        } else if (books.length < goal) {
                            updateBooksValue([...books, book]);
                            setIsBookInReadingList(true);
                        }
                    }}
                >
                    {!isImageLoaded && 
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
                        className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${isBookInReadingList ? 'opacity-30' : 'opacity-100'}`}
                    />
                    {isBookInReadingList && (
                        <div className='absolute inset-0 flex flex-col justify-center items-center gap-2'>
                            <img src={tick} alt="Tick Icon" className="transition-opacity duration-300 ease-in-out" />
                            <p className='manrope-semibold text-white text-center transition-opacity duration-300 ease-in-out'>On Shelf</p>
                        </div>
                        )}
                </div>
                <div className='flex justify-center items-center w-[70%]'>
                    <img className='absolute -top-4 left-32' src={invertedLeft} alt='Inverted-Left' />
                    <img className='absolute bottom-14 -right-4' src={invertedrRight} alt='Inverted-Right' />
                    {isBookInReadingList ? (
                        <img 
                            src={remove}
                            className='h-8 w-8 absolute top-[-15px] right-[-15px] cursor-pointer'
                            onClick={() => {
                                updateBooksValue(books.filter((readingBook) => readingBook._id !== book._id));
                                setIsBookInReadingList(false);
                            }}
                        />
                    ) : (
                        books.length < goal && (
                            <img 
                                src={add}
                                className='h-8 w-8 absolute top-[-15px] right-[-15px] cursor-pointer'
                                onClick={() => {
                                    updateBooksValue([...books, book]);
                                    setIsBookInReadingList(true);
                                }}
                            />
                        )
                    )}
                    <p className="manrope-regular text-gray-600 text-sm">{book.quote}</p>
                </div>
            </div>
            <div className='flex mt-4 justify-between'>
                <div className="flex space-x-4">
                    {showCategoryNames ? (
                        <div className='flex flex-col'>
                            {book.categories.map( (item, index) => (
                                <span key={index} className="text-gray-600 text-[10px] manrope-regular">{item}</span>
                            ))}
                        </div>
                    ) : (
                        categoryIcons
                    )}
                </div>
                <div className="flex space-x-2 items-center">
                    { book.amazon &&  <img
                        src={amazonIcon}
                        alt="Amazon"
                        className="w-auto h-4 cursor-pointer hover:tooltip"
                        title="Amazon"
                        onClick={() => openLinkInNewTab(book.amazon)}
                    />}
                    { book.perlego && <img
                        src={perlegoIcon}
                        alt="Perlego"
                        className="w-auto h-4 cursor-pointer hover:tooltip"
                        title="Perlego"
                        onClick={() => openLinkInNewTab(book.perlego)}
                    />}
                </div>
            </div>
        </div>
    );
};

export default Book;
