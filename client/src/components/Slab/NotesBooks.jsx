import React, { useState, useEffect } from 'react';
import Category from '../Category/Category';
import NotesBook from './NotesBook';
import DefaultPagination from '../Category/DefaultPagination';
import { getBooks, getCategories } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search'

const NotesBooks = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [activeCategories, setActiveCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
        .then((data) => {
            setCategories(data);
            setCategoriesLoading(false);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error.message);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getBooks((currentPage - 1) * limit, limit, activeCategories, searchTerm)
            .then((data) => {
                setBooks(data.books);
                setTotalCount(data.totalCount);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setIsLoading(false);
            });

    }, [currentPage, activeCategories]);

    useEffect(() => {
        setCurrentPage(1);
        setIsLoading(true);
        getBooks(0, limit, activeCategories, searchTerm)
            .then((data) => {
                setBooks(data.books);
                setTotalCount(data.totalCount);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setIsLoading(false);
            });
    }, [limit]);

    const handlePageChange = (newPage) => {
        const targetElement = document.getElementById("booksection");
        const offset = targetElement.offsetTop - 170;
        window.scrollTo({ top: offset, behavior: "smooth" });
        setTimeout(() => {
            setCurrentPage(newPage);
        }, 700);
    };
    
    const handleBooksPerPageChange = (newLimit) => {
        const targetElement = document.getElementById("booksection");
        const offset = targetElement.offsetTop - 170;
        window.scrollTo({ top: offset, behavior: "smooth" });
        setTimeout(() => {
            setLimit(newLimit);
        }, 700);
    };

    const handleCategoryClick = (categoryName) => {
        if (activeCategories.includes(categoryName)) {
            setActiveCategories((prevActiveCategories) =>
                prevActiveCategories.filter((cat) => cat !== categoryName)
            );
            handlePageChange(1);
        } else {
            setActiveCategories((prevActiveCategories) => [
                ...prevActiveCategories,
                categoryName,
            ]);
            handlePageChange(1);
        }
    };

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
    };

    const handleSearchClick = () => {
        setCurrentPage(1);
        setIsLoading(true);
        getBooks(0, limit, activeCategories, searchTerm)
            .then((data) => {
                setBooks(data.books);
                setTotalCount(data.totalCount);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setIsLoading(false);
            });
    }

    return (
        <section className='mx-4 sm:mx-8'>
            <div>
                <div className='flex flex-wrap justify-center mb-6 sm:mb-14 gap-2'>
                    {categories
                        .sort((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            return nameA.localeCompare(nameB);
                        })
                        .map((category) => (
                            <Category 
                                key={category._id}
                                category={category}
                                isActive={activeCategories.includes(category.name)}
                                handleCategoryClick={handleCategoryClick}
                            />
                        ))}
                </div>
                { !categoriesLoading &&
                    <div className='w-full sm:max-w-[390px] sm:ml-2'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by title or author..."
                            onChange={handleSearchChange}
                            InputProps={{
                                sx: {
                                    borderRadius: '8px',
                                    fontSize: 13,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{
                                            fontSize: 22,
                                        }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <button
                                            onClick={handleSearchClick}
                                            className="manrope-semibold bg-primary text-white py-[5px] px-4 text-[12px] rounded-md shadow-lg hover:bg-primaryDark"
                                        >
                                            Search    
                                        </button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                }
                {isLoading ? (
                    <div className='text-center text-black flex items-center justify-center h-[90vh]'>
                        <CircularProgress sx={{ color: '#8D5E20' }} />
                    </div>
                ) : books.length === 0 ? (
                    <div className='manrope-semibold text-center text-gray-700 h-[90vh] flex items-center justify-center'>No results. Try including more categories :)</div>
                ) : (
                    <>
                        <div id='booksection' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 mt-20 sm:mt-24 ml-4 sm:ml-8 gap-x-12 gap-y-20'>
                            {books.map((book, index) => (
                                <NotesBook key={index} book={book} categories={categories} currentPage={currentPage} />
                            ))}
                        </div>
                        <div className='mt-8 sm:mt-24 flex flex-col items-center justify-center overflow-hidden'>
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
                        <option value="36">36</option>
                        <option value="72">72</option>
                        <option value="96">96</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default NotesBooks;
