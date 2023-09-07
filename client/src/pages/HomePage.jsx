import React from 'react';

import Banner from '../components/Banner';
import Books from '../components/Books';

const HomePage = () => {

    return (
        <section className='px-4 pt-2 sm:pt-6 sm:px-8'>
            <Banner />
            <Books />
        </section>
    );
};

export default HomePage;
