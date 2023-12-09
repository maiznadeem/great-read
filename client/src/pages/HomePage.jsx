import React, { useEffect, useState } from 'react';

import Banner from '../components/Banner/Banner';
import Books from '../components/Books/Books';
import ReadingList from '../components/ReadingList/ReadingList';
import { useReadingList } from '../context/ReadingListContext';
import { Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ReadingListModal from '../components/ReadingList/ReadingListModal';

const HomePage = () => {

    const { isReadingListActive, readingInfo } = useReadingList();
    const [mount, setMount] = useState(isReadingListActive);
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        if (!isReadingListActive) {
            const delay = setTimeout(() => {
                setMount(false);
            }, 200);
            return () => clearTimeout(delay);
        }
        else {
            setMount(true);
        }
    }, [isReadingListActive]);

    return (
        <section className='px-4 pt-2 sm:pt-6 sm:px-8'>
            <Banner />
            {mount && <ReadingList />}
            <Books />
            {readingInfo && isReadingListActive && (
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
                    <ReadingListModal open={modalOpen} handleClose={handleClose} />
                </>
            )}
        </section>
    );
};

export default HomePage;
