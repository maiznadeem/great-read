import React from 'react';

import Banner from '../components/Banner';
import Books from '../components/Books';
import ReadingList from '../components/ReadingList';
import { useReadingList } from '../context/ReadingListContext';

const HomePage = () => {

    const { isReadingListActive } = useReadingList();

    return (
        <section className='px-4 pt-2 sm:pt-6 sm:px-8'>
            {isReadingListActive ? <ReadingList /> : <Banner />}
            <Books />
        </section>
    );
};

export default HomePage;
