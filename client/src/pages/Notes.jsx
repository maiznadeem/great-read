import React, { useState, useEffect } from 'react';
import SelectProduct from '../components/Product/SelectProduct';
import Preview from '../components/Product/Preview';
import { useNotes } from "../context/NotesContext";
import { exampleBooks } from '../components/Product/PreviewAndExamples';
import ExampleNote from '../components/Product/ExampleNote';
import Slab from '../components/Slab/Slab';
import NotesBooks from '../components/Slab/NotesBooks';

const Notes = () => {

    const { selectedButton, setSelectedButton, previewOptions, setPreviewOptions, setBooks } = useNotes();

    const handleButtonClick = (value) => {
        setBooks([]);
        setSelectedButton(value === selectedButton ? null : value);
    };

    return (
        <section className='my-6 sm:my-20 mx-4 sm:mx-8 min-h-[100vh]'>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full max-w-[700px]'>
                    <SelectProduct selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
                </div>
                { !selectedButton ?
                    <>
                        <Preview previewOptions={previewOptions} setPreviewOptions={setPreviewOptions} />
                        <div className='text-black w-full max-w-[1280px]'>
                            <h1 className='text-left text-primary manrope-semibold text-3xl py-4 sm:py-8'>Examples</h1>
                            <div className='flex flex-col justify-center items-center gap-6'>
                                {exampleBooks.map((book, index) => (
                                    <ExampleNote key={index} book={book} />
                                ))}
                            </div>
                        </div>
                    </>
                    : 
                    <div className='w-full overflow-hidden'>
                        <Slab />
                        <NotesBooks />
                    </div>
                }

            </div>
        </section>
    );
};

export default Notes;
