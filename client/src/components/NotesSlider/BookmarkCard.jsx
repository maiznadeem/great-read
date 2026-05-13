import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import amazonIcon from '../assets/links/amazon.png';
import perlegoIcon from '../assets/links/perlego.png';

const BookmarkCard = ({ note, isShuffling, resetFlip }) => {

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
    }, [resetFlip]);

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const openLinkInNewTab = (link) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    const spring = { type: 'spring', stiffness: 120, damping: 18, mass: 1 };

    return (
        <motion.div
            className="bookmark-card cursor-pointer relative"
            onClick={handleCardClick}
            animate={{
                rotateY: flipped ? 180 : 0,
                opacity: 1,
            }}
            transition={spring}
            style={{ perspective: 600 }}
        >
            <div
                className={`flex flex-col justify-center min-w-[300px] min-h-[300px] p-4 border rounded-lg shadow-lg bg-[#EFE5D857] transition-opacity duration-300 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    maxWidth: '300px',
                }}
            >
                <div className={`front w-full h-full ${flipped ? 'hidden' : ''} flex flex-col justify-center items-center`}>
                    <p className="manrope-regular text-lg text-center text-black">{note?.note}</p>
                    <p className="p-4 manrope-semibold text-xs text-center text-primary">- {note?.book?.title}</p>
                </div>
                <motion.div
                    className={`back w-full h-full ${flipped ? 'block' : 'hidden'}`}
                    animate={{ opacity: flipped ? 1 : 0 }}
                    transition={spring}
                    style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
                >
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
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BookmarkCard;
