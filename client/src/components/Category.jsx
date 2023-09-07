import React, { useState } from 'react';

const Category = ({ category, handleCategoryClick }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        handleCategoryClick(category.name);
    };

    let containerClasses = `bg-${isActive ? 'primary' : 'white'} rounded-lg shadow-md p-2 flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out`;

    if (category.id >= 32 && category.id <= 39 && window.innerWidth < 768 ) {
        containerClasses = `bg-${isActive ? 'primary' : 'white'} w-full h-full rounded-lg shadow-md p-2 flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out`;
    }
    else if (category.id >= 32 && category.id <= 39 && window.innerWidth >= 768 ) {
        containerClasses = `bg-${isActive ? 'primary' : 'white'} w-fit rounded-lg shadow-md p-2 flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out`;
    }

    
    const textClasses = `text-${isActive ? 'white' : 'black'} manrope-semibold text-xs sm:text-md`;

    const image = category.image ? (
        <img src={category.image} alt={category.name} className={`h-3 w-3 sm:w-4 sm:h-4 filter ${isActive ? 'invert' : 'none'}`} />
    ) : null;

    return (
        <div
            className={containerClasses}
            onClick={handleClick}
        >
            <div className="flex items-center space-x-2">
                {image}
                <span className={textClasses}>{category.name}</span>
            </div>
        </div>
    );
};

export default Category;
