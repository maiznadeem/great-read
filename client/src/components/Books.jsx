import React, { useState, useEffect } from 'react';
import Category from './Category';
import Book from './Book';
import DefaultPagination from './DefaultPagination';
import categoriesData from '../utils/categoriesData';
import { getBooks } from '../utils/api';
import { ClipLoader } from 'react-spinners';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategories, setActiveCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getBooks((currentPage - 1) * limit, limit, activeCategories)
            .then((data) => {
                setBooks(data.books);
                setTotalCount(data.totalCount);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setIsLoading(false);
            });
    }, [currentPage, limit, activeCategories]);    

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleBooksPerPageChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleCategoryClick = (categoryName) => {
        if (activeCategories.includes(categoryName)) {
            setActiveCategories((prevActiveCategories) =>
                prevActiveCategories.filter((cat) => cat !== categoryName)
            );
        } else {
            setActiveCategories((prevActiveCategories) => [
                ...prevActiveCategories,
                categoryName,
            ]);
        }
    };

    return (
        <section className='mx-4 sm:my-24 sm:mx-8'>
            <div>
                <p className='manrope-semibold py-6 sm:py0 text-3xl sm:text-5xl text-black text-center'>Discover <span className='text-primaryDark'>3000+</span> books to find your best self.</p>
                <div className='flex flex-wrap justify-center my-6 sm:my-14 gap-2'>
                    {categoriesData.slice(8).map((category) => (
                        <Category key={category.id} category={category} handleCategoryClick={handleCategoryClick} />
                    ))}
                </div>
                { window.innerWidth >= 768 && 
                    <div className='flex gap-2 w-full items-center flex-col sm:flex-col'>
                        <div className='flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center md:justify-between md:min-w-[750px]'>
                            {categoriesData.slice(0, 4).map((category) => (
                            <Category key={category.id} category={category} handleCategoryClick={handleCategoryClick} className="w-full sm:w-1/2" />
                            ))}
                        </div>
                        <div className='flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center md:justify-between md:min-w-[750px]'>
                            {categoriesData.slice(4, 8).map((category) => (
                            <Category key={category.id} category={category} handleCategoryClick={handleCategoryClick} className="w-full sm:w-1/2" />
                            ))}
                        </div>
                    </div> 
                }
                { window.innerWidth < 768 && 
                    <div className='flex gap-2 w-full items-center flex-col sm:flex-col'>
                        <div className='flex flex-row flex-wrap md:flex-nowrap gap-2 justify-center md:justify-between md:min-w-[750px]'>
                            {categoriesData.slice(0, 8).map((category) => (
                            <Category key={category.id} category={category} handleCategoryClick={handleCategoryClick} className="w-full sm:w-1/2" />
                            ))}
                        </div>
                    </div> 
                }
                {isLoading ? (
                    <div className='text-center text-black flex items-center justify-center h-96'>
                        <ClipLoader color={'#8D5E20'} loading={isLoading} size={50} />
                    </div>
                ) : books.length === 0 ? (
                    <div className='manrope-semibold text-center text-gray-700 h-96 flex items-center justify-center'>No results. Try including more categories :)</div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 mt-32 ml-4 sm:ml-8 gap-x-12 gap-y-20'>
                            {books.map((book, index) => (
                                <Book key={index} book={book} />
                            ))}
                        </div>
                        <div className='mt-8 sm:mt-24 flex flex-col items-center justify-center'>
                            <DefaultPagination
                                currentPage={currentPage}
                                limit={limit}
                                totalResults={totalCount}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
                <div className="flex items-center justify-center text-xs sm:text-sm mb-8 sm:mb-0">
                    <label htmlFor="booksPerPage" className="manrope-semibold mr-2 text-gray-700">
                        Books per page:
                    </label>
                    <select
                        id="booksPerPage"
                        name="booksPerPage"
                        className="manrope-semibold px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700"
                        value={limit}
                        onChange={(e) => handleBooksPerPageChange(Number(e.target.value))}
                    >
                        <option value="12">12</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default Books;
