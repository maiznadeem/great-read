import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import enabled from "../assets/buttons/enabled.svg";
import disabled from "../assets/buttons/disabled.svg";
import bookmarksUtil from '../../utils/BookmarksUtil';

const spring = { type: 'spring', stiffness: 280, damping: 32 };

function pickSlidesToShow(width) {
    if (width < 400) return 4;
    if (width < 768) return 5;
    return 7;
}

const NotesSlider = ({ currentSlide, setCurrentSlide }) => {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(() => pickSlidesToShow(typeof window !== 'undefined' ? window.innerWidth : 1024));

    useLayoutEffect(() => {
        if (!containerRef.current) return undefined;
        const update = () => {
            setContainerWidth(containerRef.current?.offsetWidth ?? 0);
            setSlidesToShow(pickSlidesToShow(window.innerWidth));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const total = bookmarksUtil.length;
    const slideWidth = containerWidth > 0 ? containerWidth / slidesToShow : 0;
    const activeIndex = Math.max(0, (currentSlide || 1) - 1);

    const offset = slideWidth > 0
        ? containerWidth / 2 - slideWidth * (activeIndex + 0.5)
        : 0;

    const goTo = (index) => {
        const next = ((index % total) + total) % total;
        setCurrentSlide(next + 1);
    };

    const next = () => goTo(activeIndex + 1);
    const prev = () => goTo(activeIndex - 1);

    useEffect(() => {
        if (!currentSlide) setCurrentSlide(1);
    }, [currentSlide, setCurrentSlide]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex max-w-[500px] mb-6'>
                <p className='manrope-regular text-center text-xl text-black'>
                    Select one of 100 bookmarks below, to see what notes are contained in it.
                </p>
            </div>
            <div className='relative w-full max-w-[300px] xs:max-w-[300px] sm:max-w-[500px] md:max-w-[600px] custsm:max-w-[720px] custmd:max-w-[800px] lg:max-w-[900px] custlg:max-w-[1000px]'>
                <img
                    src={disabled}
                    className='h-8 w-8 absolute shadow-md rounded-full top-1/2 transform -translate-y-1/2 left-[-20px] z-10 sm:left-[-40px] cursor-pointer'
                    alt='Previous'
                    onClick={prev}
                />
                <img
                    src={enabled}
                    className='h-8 w-8 absolute shadow-md rounded-full top-1/2 transform -translate-y-1/2 right-[-20px] z-10 sm:right-[-40px] cursor-pointer'
                    alt='Next'
                    onClick={next}
                />
                <div ref={containerRef} className='overflow-hidden'>
                    <motion.div
                        className='flex'
                        animate={{ x: offset }}
                        transition={spring}
                    >
                        {bookmarksUtil.map((bookmark, index) => (
                            <div
                                key={bookmark.number}
                                onClick={() => goTo(index)}
                                style={{ flex: `0 0 ${slideWidth || 0}px` }}
                                className='relative flex justify-center pt-4'
                            >
                                { index === activeIndex && <ArrowDropDownIcon className='text-green-600 absolute top-[-30px]' style={{ fontSize: '70px' }} /> }
                                <img
                                    src={bookmark.image}
                                    alt=''
                                    className='w-[100%] h-auto object-cover cursor-pointer px-1'
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NotesSlider;
