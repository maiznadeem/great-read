import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import enabled from "../assets/buttons/enabled.svg";
import disabled from "../assets/buttons/disabled.svg";
import bookmarksUtil from '../../utils/BookmarksUtil';

const NotesSlider = ({ currentSlide, setCurrentSlide, isShuffling }) => {

    const sliderRef = useRef(null);

    const CustomNextArrow = ({ currentSlide }) => {
        return (
            <img
                src={enabled}
                className={`h-8 w-8 absolute shadow-md rounded-full top-1/2 transform -translate-y-1/2 right-[-20px] z-10 sm:right-[-40px] cursor-pointer`}
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
                className={`h-8 w-8 absolute shadow-md rounded-full top-1/2 transform -translate-y-1/2 left-[-20px] z-10 sm:left-[-40px] cursor-pointer`}
                alt="Previous"
                onClick={() => {
                    if (sliderRef.current) {
                        sliderRef.current.slickPrev();
                    }
                }}
            />
        );
    };

    const settings = {
        focusOnSelect: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: "60px",
        swipeToSlide: true,
        rows: 1,
        nextArrow: <CustomNextArrow currentSlide={currentSlide} />,
        prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
        afterChange: (newSlide) => {
            setCurrentSlide(newSlide+1);
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 4,
                },
            },
        ]
    };


    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex max-w-[500px] mb-6'>
                <p className='manrope-regular text-center text-xl text-black'>
                    Select one of 100 bookmarks below, to see what notes are contained in it.
                </p>
            </div>
            <Slider {...settings} ref={sliderRef} className='w-full max-w-[300px] xs:max-w-[300px] sm:max-w-[500px] md:max-w-[600px] custsm:max-w-[720px] custmd:max-w-[800px] lg:max-w-[900px] custlg:max-w-[1000px]'>
                {bookmarksUtil.map((bookmark, index) => (
                    <div key={bookmark.number} className='flex'>
                        <div className={`relative flex justify-center pt-4`}>
                                { index === currentSlide-1 && <ArrowDropDownIcon className='text-green-600 absolute top-[-30px]'  style={{ fontSize: '70px' }} /> }
                                <img 
                                    src={bookmark.image}
                                    alt=""
                                    className="w-[100%] h-auto object-cover cursor-pointer"
                                />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default NotesSlider