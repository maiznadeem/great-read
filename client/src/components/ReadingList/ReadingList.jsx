import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ReadingListForm from './ReadingListForm';
import { useReadingList } from '../../context/ReadingListContext';
import Shelf from './Shelf';

const ReadingList = () => {
    const { readingInfo, isReadingListActive, toggleReadingList } = useReadingList();

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

    const handleReadingListClose = () => {
        toggleReadingList();
    }

    return (
        <div id='readinglistsection' className='flex flex-col items-center w-full mt-10 sm:mt-20'>
            <animated.div
                style={{ ...fadeInOut, ...zoomInOut }}
                className={`flex flex-col items-center gap-4 rounded-xl shadow-xl ${readingInfo ? 'w-full sm:w-[80%] md:w-[100%] max-w-[680px]' : 'max-w-[100%] md:max-w-[600px]'}`}
            >
                <IconButton
                    onClick={handleReadingListClose}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'text.primary',
                    }}
                >
                    <ClearIcon />
                </IconButton>
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
