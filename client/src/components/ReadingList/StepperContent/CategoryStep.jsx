import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../utils/api';
import Category from '../../../components/Category/Category';
import { Scrollbars } from 'react-custom-scrollbars';
import LinearProgress from '@mui/material/LinearProgress';

const CategoryStep = ({ selectedCategories, handleCategoryClick }) => {

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


    return (
        <Scrollbars style={{ width: '100%', height: '50px' }}>
            <div className='flex items-center justify-center h-[45px]'>
                {isLoading ? (
                    <div className='flex justify-center items-center w-1/3 min-w-[200px]'>
                        <LinearProgress sx={{ width: '100%', backgroundColor: '#cca170', '& .MuiLinearProgress-bar': { backgroundColor: '#8D5E20' } }} />
                     </div>
                ) : (
                    <div className='flex w-[100%] gap-x-2'>
                        {categories.map((category) => (
                            <div key={category._id} className="flex-shrink-0">
                                <Category 
                                    category={category}
                                    isActive={selectedCategories.includes(category.name)}
                                    handleCategoryClick={handleCategoryClick}
                                />
                            </div>
                        ))}
                    </div> 
                )}
            </div>
        </Scrollbars>
    )
}

export default CategoryStep