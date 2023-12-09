import React, { useEffect, useState, useRef, forwardRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CircularProgress from '@mui/material/CircularProgress';
import waves from '../../assets/backgrounds/waves.png';
import linear from '../../assets/backgrounds/linear.png';
import enabled from "../../assets/buttons/enabled.svg";
import disabled from "../../assets/buttons/disabled.svg";
import remove from "../../assets/buttons/Remove.svg";
import { useReadingList } from '../../context/ReadingListContext';
import { getRandomBooks } from '../../utils/api';
import CategoryStep from './StepperContent/CategoryStep';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PDFModal from './PDF/PDFModal';

const Shelf = forwardRef((props, ref) => {
    const {
        name,
        goal,
        period,
        selectionChoice,
        books,
        selectedCategories,
        setSelectedCategoriesValue,
        updateBooksValue,
    } = useReadingList();


    const sliderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState(0);
    const prevSelectedCategories = useRef(selectedCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (ref) {
            ref.current = sliderRef.current;
        }
    }, [ref]);

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

    useEffect(() => {
        if (selectedCategories.length && selectedCategories !== prevSelectedCategories.current) {
            setIsLoading(true);
            getRandomBooks(selectedCategories, goal, [])
                .then((randomBooks) => {
                    updateBooksValue(randomBooks);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
        prevSelectedCategories.current = selectedCategories;
    }, [selectedCategories]);

    const handleCategoryClick = (categoryName) => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategoriesValue((prevActiveCategories) =>
                prevActiveCategories.filter((cat) => cat !== categoryName)
            );
        } else {
            setSelectedCategoriesValue((prevActiveCategories) => [
                ...prevActiveCategories,
                categoryName,
            ]);
        }
    };

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

    const maxRows = 2;
    const calculatedRows = Math.ceil(books.length / slidesToShow);

    const settings = {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
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
        ]
    };

    const shareUrl = 'https://great-read-mu.vercel.app';
    const plural = books.length > 1 ? `${books.length} books` : `1 book`;
    const postDescription = `I made a reading goal of ${plural} for ${period} on Great Read!\nCreate yours at: ${shareUrl}\n` + 
        "Find books categorised as Procrastination Killers, Finding Yourself and Mind Tabs."
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postDescription)}`;
    return (
        <div className="bg-footer py-3 px-6 sm:py-0 sm:px-8 rounded-xl w-full max-w-[680px]" 
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${linear}), url(${waves})`,
                backgroundSize: 'cover, auto 100%, cover',
                backgroundPosition: 'center, right, center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="flex flex-col items-center gap-4 sm:gap-4 py-4 sm:py-8">
                <p className="manrope-semibold text-center text-xl sm:text-2xl text-black">{name}'s Reading List</p>
                <div>
                    <p className="manrope-semibold text-center text-lg sm:text-xl text-primary">{books.length} out of {goal === 1 ? "1 book" : `${goal} books`}</p>
                    <p className="manrope-semibold text-center text-lg sm:text-xl text-primary">for {period}</p>
                </div>
                {selectionChoice == 'choose for me' && (
                    <CategoryStep selectedCategories={selectedCategories} handleCategoryClick={handleCategoryClick} />
                )}
                <div className="w-full flex justify-center items-center bg-footer border-2 border-gray-400 border-dashed rounded-xl min-h-[200px]">
                    
                    {isLoading ? (
                        <CircularProgress sx={{ color: '#8D5E20' }} />
                    ) : (
                        books.length === 0 && selectionChoice == 'i will choose' ? (
                            <p className="text-md sm:text-lg text-center manrope-regular text-gray-400">Select books from below to add to your shelf.</p>
                        ) 
                        : books.length === 0 && selectionChoice == 'choose for me' ? (
                            <>
                                <p className="text-md sm:text-lg text-center manrope-regular text-gray-400">Select your categories and we will stack your shelf.</p>
                            </>
                        ) : (
                            <Slider {...settings} ref={sliderRef} className='w-[90%] lg:w-[600px] p-2'>
                                {books.map((book) => (
                                    <div key={book._id} className='flex'>
                                        <div className="flex justify-center h-[160px] overflow-hidden">
                                            <div className='relative mt-[8px] mr-[8px]'>
                                                <img 
                                                    src={remove}
                                                    className='h-4 w-4 absolute top-[-6px] right-[-6px] cursor-pointer'
                                                    onClick={() => {
                                                        updateBooksValue(books.filter((readingBook) => readingBook._id !== book._id));
                                                    }}
                                                />
                                                <img src={book.image} alt="" className="w-24 rounded-md shadow-md h-36 object-cover cursor-pointer" 
                                                    onClick={() => {
                                                        updateBooksValue(books.filter((readingBook) => readingBook._id !== book._id));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )
                    )}
                </div>
                <div className='flex flex-col justify-center items-center gap-3 w-full text-black text-xs'>
                    <p className='text-sm sm:text-md text-center'>You will be able to download it as a PDF and/or share it on your LinkedIn.</p>
                    <div className='flex gap-4'>
                        <button
                            onClick={handleOpenModal}
                            className={`w-28 rounded-lg shadow-lg px-2 py-1 flex justify-center items-center gap-1 bg-white
                            ${books.length === 0 ? ' cursor-not-allowed opacity-50' : 'opacity-100'}`}
                            disabled={books.length === 0}
                        >
                            <PictureAsPdfIcon className='text-red-700' />
                            Download
                        </button>
                            <a
                                href={linkedInShareUrl}
                                target='_blank'
                                className={`w-28 rounded-lg shadow-lg px-2 py-1 flex justify-center items-center gap-1 bg-white
                                ${books.length === 0 ? 'cursor-not-allowed opacity-50' : 'opacity-100'}`}
                                disabled={books.length === 0}
                            >
                                <LinkedInIcon className='text-blue-700' />
                                Share
                            </a>
                        <PDFModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Shelf;