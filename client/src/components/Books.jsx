import React, { useState, useEffect } from 'react';
import Category from './Category';
import Book from './Book';
import DefaultPagination from './DefaultPagination';
import { getBooks, getCategories } from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useReadingList } from '../context/ReadingListContext';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

const Books = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategories, setActiveCategories] = useState([]);
    const { books: contextBooks, pageRefresh, togglePageRefresh } = useReadingList();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
        .then((data) => {
            setCategories(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error.message);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getBooks((currentPage - 1) * limit, limit, activeCategories, contextBooks)
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

    useEffect(() => {
        if(pageRefresh) {
            setActiveCategories([]);
            setCurrentPage(1);
            togglePageRefresh();
        }
    }, [pageRefresh])

    const bestsellerCategories = [];
    const filteredCategories = [];

    categories.forEach((category) => {
        if (category.bestseller) {
            bestsellerCategories.push(category);
        } else {
            filteredCategories.push(category);
        }
    });

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
            setCurrentPage(1);
        }, 700);
    };

    const handleCategoryClick = (categoryName) => {
        if (activeCategories.includes(categoryName)) {
            setActiveCategories((prevActiveCategories) =>
                prevActiveCategories.filter((cat) => cat !== categoryName)
            );
            setCurrentPage(1);
        } else {
            setActiveCategories((prevActiveCategories) => [
                ...prevActiveCategories,
                categoryName,
            ]);
            setCurrentPage(1);
        }
    };

    return (
        <section className='mx-4 mt-10 sm:my-20 sm:mx-8'>
            <div>
                <div className='flex flex-wrap justify-center mb-6 sm:mb-14 gap-2'>
                    {filteredCategories
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
                <div className='w-full sm:w-fit sm:max-w-[400px] sm:ml-2'>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton edge="start">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button variant='contained'>Search</Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
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
                                <Book key={index} book={book} categories={categories} currentPage={currentPage} />
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

export default Books;
