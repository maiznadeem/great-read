import React, { useEffect, useState } from 'react'
import { getCategories } from '../api';
import Category from '../../components/Category';
import { Scrollbars } from 'react-custom-scrollbars';
import LinearProgress from '@mui/material/LinearProgress';

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
            <div className='flex items-center justify-center h-[45px]'>
                {isLoading ? (
                    <div className='flex justify-center items-center w-1/3 min-w-[200px]'>
                        <LinearProgress sx={{ width: '100%', backgroundColor: '#cca170', '& .MuiLinearProgress-bar': { backgroundColor: '#8D5E20' } }} />
                     </div>
                ) : (
                    <div className='flex w-[100%] gap-x-2'>
                        {categories.map((category) => (
                            <div key={category._id} className="flex-shrink-0">
                                <Category category={category} handleCategoryClick={handleCategoryClick} setActiveCategory={true} />
                            </div>
                        ))}
                    </div> 
                )}
            </div>
        </Scrollbars>
    )
}

export default CategoryStep