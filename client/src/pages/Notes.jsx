import React, { useState, useEffect } from 'react';
import SelectProduct from '../components/SelectProduct';
import Preview from '../components/Preview';

const Notes = () => {

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (value) => {
        setSelectedButton(value === selectedButton ? null : value);
    };

    return (
        <section className='mt-6 sm:mt-12 sm:my-14 mx-4 sm:mx-8 min-h-[100vh]'>
            <div className='flex flex-col gap-8 items-center justify-center w-full'>
                <div className='flex flex-col gap-4 items-center w-full max-w-[700px]'>
                    <SelectProduct selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
                </div>
                { !selectedButton &&
                    <Preview />
                }
            </div>
        </section>
    );
};

export default Notes;
