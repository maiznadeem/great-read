import React from 'react';

import Banner from '../components/Banner';
import Books from '../components/Books';

const HomePage = () => {

    return (
        <section className='px-2 pt-28 sm:py-4 sm:px-8'>
            <Banner />
            <Books />
        </section>
    );
};

export default HomePage;
