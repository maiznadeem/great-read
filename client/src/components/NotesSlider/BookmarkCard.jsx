import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import amazonIcon from '../assets/links/amazon.png';
import perlegoIcon from '../assets/links/perlego.png';

const BookmarkCard = ({ note, isShuffling, resetFlip }) => {
    
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
    }, [resetFlip]);

    const { transform, opacity } = useSpring({
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const { opacity: textOpacity } = useSpring({
        opacity: flipped ? 1 : 0,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const handleCardClick = () => {
        setFlipped(!flipped);
    };
    
    const openLinkInNewTab = (link) => {
        window.open(link, '_blank');
    };

    return (
        <animated.div
            className="bookmark-card cursor-pointer relative"
            onClick={handleCardClick}
            style={{ opacity, transform }}
        >
            <div
                className={`flex flex-col justify-center min-w-[300px] min-h-[300px] p-4 border rounded-lg shadow-lg bg-[#EFE5D857] transition-opacity duration-300 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    maxWidth: '300px',
                }}
            >
                <animated.div className={`front w-full h-full ${flipped ? 'hidden' : ''} flex flex-col justify-center items-center`}>
                    <p className="manrope-regular text-lg text-center text-black">{note?.note}</p>
                    <p className="p-4 manrope-semibold text-xs text-center text-primary">- {note?.book?.title}</p>
                </animated.div>
                <animated.div className={`back w-full h-full ${flipped ? 'block' : 'hidden'}`} style={{ transform: `rotateY(${flipped ? 180 : 0}deg)`, opacity: textOpacity }}>
                    <div className='flex flex-col gap-6 justify-center items-center'>
                        <img src={note?.book?.image} className='h-44 w-28 object-cover rounded-lg shadow-lg' />
                        <div className="flex space-x-4 items-center">
                            { note?.book?.amazon &&  <img
                                src={amazonIcon}
                                alt="Amazon"
                                className="w-auto h-4 cursor-pointer hover:tooltip"
                                title="Amazon"
                                onClick={() => openLinkInNewTab(note?.book?.amazon)}
                            />}
                            { note?.book?.perlego && <img
                                src={perlegoIcon}
                                alt="Perlego"
                                className="w-auto h-4 cursor-pointer hover:tooltip"
                                title="Perlego"
                                onClick={() => openLinkInNewTab(note?.book?.perlego)}
                            />}
                        </div>
                    </div>
                </animated.div>
            </div>
        </animated.div>
    );
};

export default BookmarkCard;
