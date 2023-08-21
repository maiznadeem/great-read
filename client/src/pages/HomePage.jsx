import React from 'react';

import Banner from '../components/Banner';
import Books from '../components/Books';

const HomePage = () => {

    return (
        <section className='py-4 pt-40 px-8'>
            <Banner />
            <Books />
        </section>
    );
};

export default HomePage;
