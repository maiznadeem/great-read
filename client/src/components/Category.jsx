import React, { useState } from 'react';

const Category = ({ category }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const containerClasses = `bg-${isActive ? 'primary' : 'white'} rounded-lg shadow-md p-2 flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out`;
    const textClasses = `text-${isActive ? 'white' : 'black'} manrope-semibold text-md`;
    const imageClasses = `w-4 h-4 filter ${isActive ? 'invert' : 'none'}`;

    return (
        <div
            className={containerClasses}
            onClick={handleClick}
        >
            <div className="flex items-center space-x-2">
                <img src={category.image} alt={category.name} className={imageClasses} />
                <span className={textClasses}>{category.name}</span>
            </div>
        </div>
    );
};

export default Category;
