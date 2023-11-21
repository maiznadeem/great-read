import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import ReadingListForm from './ReadingListForm';
import { useReadingList } from '../context/ReadingListContext';
import Shelf from './Shelf';

const ReadingList = () => {
    const { readingInfo, isReadingListActive } = useReadingList();

    const fadeInOut = useSpring({
        opacity: isReadingListActive ? 1 : 0,
        from: { opacity: 0 },
        config: config.gentle,
    });

    const zoomInOut = useSpring({
        transform: isReadingListActive ? 'scale(1)' : 'scale(0.8)',
        from: { transform: 'scale(0.8)' },
        config: config.wobbly,
    });

    return (
        <div className='flex flex-col items-center w-full mt-10 sm:mt-20'>
            <animated.div
                style={{ ...fadeInOut, ...zoomInOut }}
                className={`flex flex-col items-center gap-4 rounded-xl shadow-xl ${readingInfo ? 'w-[100%] md:w-[80%] md:max-w-[100%] lg:w-[680px]' : 'max-w-[100%] md:max-w-[600px]'}`}
            >
                {readingInfo ? (
                    <Shelf />
                ) : (
                    <ReadingListForm />
                )}
            </animated.div>
        </div>
    );
};

export default ReadingList;
