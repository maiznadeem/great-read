import React from 'react';

import Category from './Category';
import Book from './Book';
import Pagination from './Pagination';
import categoriesData from '../utils/categoriesData';

import book1 from '../assets/books/Book1.jpg'

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
        <section className='my-24 mx-8'>
            <div>
                <p className='text-5xl text-black mt-44 text-center'>Discover <span className='text-primaryDark'>3000+</span> books to find your best self.</p>
                <div className='flex flex-wrap justify-center my-14 gap-2'>
                    {categoriesData.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-32 ml-8 gap-x-12 gap-y-20'>
                    {books.map((book) => (
                        <Book key={book.id} book={book} />
                    ))}
                </div>
                <div className='my-12 flex items-center justify-center'>
                    <Pagination />
                </div>
            </div>
        </section>
    );
};

export default Books;
