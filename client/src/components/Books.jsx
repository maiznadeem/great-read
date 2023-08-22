import React from 'react';

import Category from './Category';
import Book from './Book';
import DefaultPagination from './DefaultPagination';
import categoriesData from '../utils/categoriesData';

import book1 from '../assets/books/Book1.jpg';


const Books = () => {

    const books = [
        {
            id: 1,
            title: 'Alibaba: The House That Jack Ma Built',
            author: 'Duncan Clark',
            categories: ['Autobiography/Biography', 'Teamwork'],
            notableQuote: 'Customers first, employees second, and shareholders third.',
            amazon: 'https://www.amazon.co.uk/Alibaba-House-That-Jack-Built/dp/0062413406/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1678630895&sr=8-1',
            perlego: 'https://www.perlego.com/book/587017/alibaba-pdf?queryID=53e82ce583e7f6a8aaa89c855e252fc0&index=prod_BOOKS&gridPosition=1',
            image: book1,
        },
        {
            id: 2,
            title: 'Alibaba: The House That Jack Ma Built',
            author: 'Duncan Clark',
            categories: ['Autobiography/Biography', 'Teamwork'],
            notableQuote: 'Customers first, employees second, and shareholders third.',
            amazon: 'https://www.amazon.co.uk/Alibaba-House-That-Jack-Built/dp/0062413406/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1678630895&sr=8-1',
            perlego: 'https://www.perlego.com/book/587017/alibaba-pdf?queryID=53e82ce583e7f6a8aaa89c855e252fc0&index=prod_BOOKS&gridPosition=1',
            image: book1,
        },
        {
            id: 3,
            title: 'Alibaba: The House That Jack Ma Built',
            author: 'Duncan Clark',
            categories: ['Autobiography/Biography', 'Teamwork'],
            notableQuote: 'Customers first, employees second, and shareholders third.',
            amazon: 'https://www.amazon.co.uk/Alibaba-House-That-Jack-Built/dp/0062413406/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1678630895&sr=8-1',
            perlego: 'https://www.perlego.com/book/587017/alibaba-pdf?queryID=53e82ce583e7f6a8aaa89c855e252fc0&index=prod_BOOKS&gridPosition=1',
            image: book1,
        },
        {
            id: 4,
            title: 'Alibaba: The House That Jack Ma Built',
            author: 'Duncan Clark',
            categories: ['Autobiography/Biography', 'Teamwork'],
            notableQuote: 'Customers first, employees second, and shareholders third.',
            amazon: 'https://www.amazon.co.uk/Alibaba-House-That-Jack-Built/dp/0062413406/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1678630895&sr=8-1',
            perlego: 'https://www.perlego.com/book/587017/alibaba-pdf?queryID=53e82ce583e7f6a8aaa89c855e252fc0&index=prod_BOOKS&gridPosition=1',
            image: book1,
        },
        {
            id: 5,
            title: 'Alibaba: The House That Jack Ma Built',
            author: 'Duncan Clark',
            categories: ['Autobiography/Biography', 'Teamwork'],
            notableQuote: 'Customers first, employees second, and shareholders third.',
            amazon: 'https://www.amazon.co.uk/Alibaba-House-That-Jack-Built/dp/0062413406/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1678630895&sr=8-1',
            perlego: 'https://www.perlego.com/book/587017/alibaba-pdf?queryID=53e82ce583e7f6a8aaa89c855e252fc0&index=prod_BOOKS&gridPosition=1',
            image: book1,
        },
    ]

    return (
        <section className='mx-4 sm:my-24 sm:mx-8'>
            <div>
                <p className='manrope-semibold py-6 sm:py0 text-3xl sm:text-5xl text-black lg:mt-44 text-center'>Discover <span className='text-primaryDark'>3000+</span> books to find your best self.</p>
                <div className='flex flex-wrap justify-center my-6 sm:my-14 gap-2'>
                    {categoriesData.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 mt-32 ml-4 sm:ml-8 gap-x-12 gap-y-20'>
                    {books.map((book) => (
                        <Book key={book.id} book={book} />
                    ))}
                </div>
                <div className='my-12 flex flex-col items-center justify-center scale-65 sm:scale-100'>
                <DefaultPagination
                    currentPage={1}
                    limit={10}
                    totalResults={104}
                />
                </div>
            </div>
        </section>
    );
};

export default Books;
