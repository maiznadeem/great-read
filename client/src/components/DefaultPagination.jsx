import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const DefaultPagination = ({ currentPage, limit, totalResults, onPageChange }) => {

    const [current, setCurrent] = useState(currentPage);

    const totalPages = Math.ceil(totalResults / limit);

    const startEntry = (current - 1) * limit + 1;
    const endEntry = Math.min(current * limit, totalResults);

    const renderPageButtons = () => {
        const buttons = [];

        const leftBound = Math.max(1, current - 2);
        const rightBound = Math.min(totalPages, current + 2);

        if (leftBound > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="relative inline-flex items-center px-4 py-2 text-sm manrope-semibold text-black ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    1
                </button>
            );
            if (leftBound > 2) {
                buttons.push(
                    <span key="left-dots" className="text-black relative inline-flex items-center px-4 py-2 text-sm manrope-semibold">
                        ...
                    </span>
                );
            }
        }

        for (let i = leftBound; i <= rightBound; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    aria-current={current === i ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm manrope-semibold ${
                        current === i
                            ? 'bg-primaryDark text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                            : 'text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (rightBound < totalPages) {
            if (rightBound < totalPages - 1) {
                buttons.push(
                    <span key="right-dots" className="relative text-black inline-flex items-center px-4 py-2 text-sm manrope-semibold">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="relative inline-flex items-center px-4 py-2 text-sm manrope-semibold text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    const handlePageChange = (newPage) => {
        setCurrent(newPage);
        onPageChange(newPage);
    };

    return (
        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-4 items-center justify-between sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(current - 1)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                current === 1 ? 'pointer-events-none opacity-50' : ''
                            }`}
                            disabled={current === 1}
                        >
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            Prev
                        </button>
                        {renderPageButtons()}
                        <button
                            onClick={() => handlePageChange(current + 1)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                current === totalPages ? 'pointer-events-none opacity-50' : ''
                            }`}
                            disabled={current === totalPages}
                        >
                            Next
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
                <div className="text-sm text-gray-700 mt-2">
                    Showing <span className="manrope-semibold">{startEntry}</span> to{' '}
                    <span className="manrope-semibold">{endEntry}</span> of{' '}
                    <span className="manrope-semibold">{totalResults}</span> results
                </div>
            </div>
        </div>
    );
};

export default DefaultPagination;
