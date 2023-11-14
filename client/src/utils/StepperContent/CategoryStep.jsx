import React, { useEffect, useState } from 'react'
import { getCategories } from '../api';
import Category from '../../components/Category';
import { Scrollbars } from 'react-custom-scrollbars';

const CategoryStep = ({ handleCategoryClick }) => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    const bestsellerCategories = [];
    const nonBestsellerCategories = [];

    categories.forEach((category) => {
        if (category.bestseller) {
            bestsellerCategories.push(category);
        } else {
            nonBestsellerCategories.push(category);
        }
    });


    return (
        <Scrollbars style={{ width: '100%', height: '45px' }}>
            <div className='flex items-center justify-center'>
                {isLoading ? (
                    <p className='manrope-regular text-gray-400 min-h-[25px]'>Loading...</p>
                ) : (
                    <div className='flex w-[100%] gap-x-2'>
                        {categories.map((category) => (
                            <div key={category._id} className="flex-shrink-0">
                                <Category category={category} handleCategoryClick={handleCategoryClick} />
                            </div>
                        ))}
                    </div> 
                )}
            </div>
        </Scrollbars>
    )
}

export default CategoryStep