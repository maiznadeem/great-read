import React, { useEffect, useState } from 'react'
import { getCategories } from '../api';
import Category from '../../components/Category';

import { Scrollbars } from 'react-custom-scrollbars';
import Grid from '@mui/material/Grid';

const CategoryStep = ({ name, selectedCategories, setSelectedCategories }) => {

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
        <div className="step-content">
            <div className={`flex flex-col items-center gap-4 py-4 sm:py-8`}>
                <p className='text-black text-center text-xl sm:text-2xl manrope-semibold'>
                    Hi {name}, please select some categories
                </p>
                {isLoading ? (
                    <p className='flex justify-center items-center manrope-regular text-gray-400 min-h-[50px]'>Loading...</p>
                ) : (
                    <Scrollbars style={{ width: '100%', overflowX: 'auto', height: '50px' }}>
                        <div className='flex'>
                            {categories.map((category) => (
                                <div key={category._id} className='mr-2 min-w-fit'>
                                    <Category category={category} handleCategoryClick={() => console.log("selected")} />
                                </div>
                            ))}
                        </div>
                    </Scrollbars>
                )}
            </div>
        </div>
    )    
}

export default CategoryStep