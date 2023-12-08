import React, { useState } from 'react'
import DownloadNotesModal from './DownloadNotesModal';

const DownloadNotes = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPages, setSelectedPages] = useState(100);

    const handleModalOpen = (pages) => {
        setModalOpen(true);
        setSelectedPages(pages);
    };
    
    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className='bg-footer w-full flex flex-col justify-center items-center p-8 gap-4 rounded-xl shadow-lg'>
            <p className='manrope-regular text-black text-xl text-center'>Access the notes in bundles:</p>
            <div className='flex gap-2 sm:gap-4 flex-col sm:flex-row'>
                <button 
                    onClick={() => handleModalOpen(100)}
                    className='w-32 sm:w-36 bg-[#FFA500] manrope-regular text-lg sm:text-xl p-1 sm:p-2 rounded-xl hover:bg-[#eb9800] transition-all ease-in-out'
                >
                    100 pages<br />£59
                </button>
                <button
                    onClick={() => handleModalOpen(500)}
                    className='w-32 sm:w-36 bg-[#FFA500] manrope-regular text-lg sm:text-xl p-1 sm:p-2 rounded-xl hover:bg-[#eb9800] transition-all ease-in-out'
                >
                    500 pages<br />£179
                </button>
                <button 
                    onClick={() => handleModalOpen(1000)}
                    className='w-32 sm:w-36 bg-[#FFA500] manrope-regular text-lg sm:text-xl p-1 sm:p-2 rounded-xl hover:bg-[#eb9800] transition-all ease-in-out'
                >
                    1,000+ pages<br />£279
                </button>
            </div>
            <DownloadNotesModal open={modalOpen} handleClose={handleModalClose} pages={selectedPages} />
        </div>
    )
}

export default DownloadNotes