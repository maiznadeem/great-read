import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CircularProgress from '@mui/material/CircularProgress';
import waves from '../assets/backgrounds/waves.png';
import linear from '../assets/backgrounds/linear.png';
import enabled from "../assets/buttons/enabled.svg";
import disabled from "../assets/buttons/disabled.svg";
import remove from "../assets/buttons/Remove.svg";
import { useReadingList } from '../context/ReadingListContext';
import { getRandomBooks } from '../utils/api';

const Shelf = () => {
    const {
        name,
        goal,
        period,
        books,
        selectedCategories,
        setBooksValue,
        updateBooksValue,
    } = useReadingList();

    const sliderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (selectedCategories.length > 0 && books.length === 0) {
            setIsLoading(true);
            getRandomBooks(selectedCategories, goal)
                .then((randomBooks) => {
                    setBooksValue(randomBooks);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    }, [selectedCategories, goal, books]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const CustomNextArrow = ({ currentSlide }) => {
        const itemsToShow = settings.responsive.find((item) => windowSize >= item.breakpoint)?.settings.slidesToShow || 0;
        const isEnd = currentSlide >= (books.length / settings.rows) - itemsToShow - 1;
    
        return (
            <img
                src={enabled}
                className={`h-8 w-8 absolute top-1/2 transform -translate-y-1/2 right-[-20px] cursor-pointer ${isEnd ? 'opacity-10 pointer-events-none' : ''}`}
                alt="Next"
                onClick={() => {
                    if (!isEnd && sliderRef.current) {
                        sliderRef.current.slickNext();
                    }
                }}
            />
        );
    };
    
    const CustomPrevArrow = ({ currentSlide }) => {
        const isStart = currentSlide === 0;
        return (
            <img
                src={disabled}
                className={`h-8 w-8 absolute top-1/2 transform -translate-y-1/2 left-[-20px] cursor-pointer ${isStart ? 'opacity-10 pointer-events-none' : ''}`}
                alt="Previous"
                onClick={() => {
                    if (!isStart && sliderRef.current) {
                        sliderRef.current.slickPrev();
                    }
                }}
            />
        );
    };

    let slidesToShow = 6;

    if (windowSize <= 1100)
        slidesToShow = 5;
    if (windowSize <= 950)
        slidesToShow = 4;
    if (windowSize <= 800)
        slidesToShow = 3;
    if (windowSize <= 600)
        slidesToShow = 2;
    if (windowSize <= 100)
        slidesToShow = 1;

    const maxRows = 2;
    const calculatedRows = Math.ceil(books.length / slidesToShow);

    const settings = {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        lazyLoad: true,
        rows: calculatedRows <= maxRows ? calculatedRows : maxRows,
        nextArrow: <CustomNextArrow currentSlide={currentSlide} />,
        prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
        afterChange: (currentSlide) => {
            setCurrentSlide(currentSlide);
        },
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }; 

    return (
        <div className="bg-footer py-3 px-6 sm:py-3 sm:px-8 rounded-xl w-full" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${linear}), url(${waves})`,
            backgroundSize: 'cover, auto 100%, cover',
            backgroundPosition: 'center, right, center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="flex flex-col items-center gap-4 sm:gap-6 py-4 sm:py-8">
                <p className="manrope-semibold text-center text-xl sm:text-2xl text-black">{name}'s Reading List</p>
                <div>
                    <p className="manrope-semibold text-center text-lg sm:text-xl text-primary">{books.length} out of {goal === 1 ? "1 book" : `${goal} books`} chosen for your</p>
                    <p className="manrope-semibold text-center text-lg sm:text-xl text-primary">reading goal for {period}</p>
                </div>
                <div className="w-full flex justify-center items-center bg-footer border-2 border-gray-400 border-dashed rounded-xl min-h-[200px]">
                    
                    {isLoading ? (
                        <CircularProgress sx={{ color: '#8D5E20' }} />
                    ) : (
                        books.length === 0 ? (
                            <p className="text-lg sm:text-xl manrope-regular text-gray-400">Select books from below to add to your shelf</p>
                        ) : (
                            <Slider {...settings} ref={sliderRef} className='w-[90%] p-8'>
                                {books.map((book) => (
                                    <div key={book._id} className='flex'>
                                        <div className="w-[100%] flex justify-center h-40 overflow-hidden">
                                            <div className='relative mt-[8px] mr-[8px]'>
                                                <img 
                                                    src={remove}
                                                    className='h-4 w-4 absolute top-[-8px] right-[-8px] cursor-pointer'
                                                    onClick={() => {
                                                        updateBooksValue(books.filter((readingBook) => readingBook._id !== book._id));
                                                    }}
                                                />
                                                <img src={book.image} alt="" className="w-24 rounded-lg h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shelf;