import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import enabled from "../assets/buttons/enabled.svg";
import disabled from "../assets/buttons/disabled.svg";
import bookmarksUtil from '../utils/BookmarksUtil';

const NotesSlider = () => {

    const sliderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState(0);

    const CustomNextArrow = ({ currentSlide }) => {
        return (
            <img
                src={enabled}
                className={`h-8 w-8 absolute top-1/2 transform -translate-y-1/2 right-[-20px] cursor-pointer`}
                alt="Next"
                onClick={() => {
                    if (sliderRef.current) {
                        sliderRef.current.slickNext();
                    }
                }}
            />
        );
    };
    
    const CustomPrevArrow = ({ currentSlide }) => {
        return (
            <img
                src={disabled}
                className={`h-8 w-8 absolute top-1/2 transform -translate-y-1/2 left-[-20px] cursor-pointer`}
                alt="Previous"
                onClick={() => {
                    if (sliderRef.current) {
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
    const calculatedRows = Math.ceil(bookmarksUtil.length / slidesToShow);

    const settings = {
        slidesToShow: 7,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        lazyLoad: true,
        rows: 1,
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
        <Slider {...settings} ref={sliderRef} className='w-[90%] lg:w-[100%] lg:max-w-[1000px] p-4'>
            {bookmarksUtil.map((bookmark) => (
                <div key={bookmark.number} className='flex'>
                    <div className="flex justify-center overflow-hidden">
                            <img 
                                src={bookmark.image}
                                alt=""
                                className="w-36 h-auto object-cover cursor-pointer"
                            />
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default NotesSlider