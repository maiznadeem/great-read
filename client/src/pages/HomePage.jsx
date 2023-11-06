import React, { useState } from 'react';

import Banner from '../components/Banner';
import Books from '../components/Books';
import ReadingList from '../components/ReadingList';
import { useReadingList } from '../context/ReadingListContext';
import { Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ReadingInfoModal from '../components/ReadingInfoModal';

const HomePage = () => {

    const { isReadingListActive, readingInfo } = useReadingList();
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <section className='px-4 pt-2 sm:pt-6 sm:px-8'>
            {isReadingListActive ? <ReadingList /> : <Banner />}
            <Books />
            {readingInfo && (
                <>
                    <Button variant="contained"
                        sx={{
                            color: 'white',
                            backgroundColor: '#956829',
                            height: 60,
                            width: 60,
                            borderRadius: '50%',
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 1000,
                            '&:hover': {
                                backgroundColor: '#8D5E20',
                            }
                        }}
                        onClick={handleOpen}
                    >
                        <AutoStoriesIcon />
                    </Button>
                    <ReadingInfoModal open={modalOpen} handleClose={handleClose} />
                </>
            )}
        </section>
    );
};

export default HomePage;
