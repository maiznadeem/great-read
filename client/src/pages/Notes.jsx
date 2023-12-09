import React, { useState, useEffect } from 'react';
import SelectProduct from '../components/Product/SelectProduct';
import Preview from '../components/Product/Preview';
import { useNotes } from "../context/NotesContext";
import { exampleBooks } from '../components/Product/PreviewAndExamples';
import ExampleNote from '../components/Product/ExampleNote';

const Notes = () => {

    const { selectedButton, setSelectedButton, previewOptions, setPreviewOptions } = useNotes();

    const handleButtonClick = (value) => {
        setSelectedButton(value === selectedButton ? null : value);
    };

    return (
        <section className='my-6 sm:my-14 mx-4 sm:mx-8 min-h-[100vh]'>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full max-w-[700px]'>
                    <SelectProduct selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
                </div>
                { !selectedButton &&
                    <>
                        <Preview previewOptions={previewOptions} setPreviewOptions={setPreviewOptions} />
                        <div className='text-black w-full'>
                            <h1 className='text-left text-primary manrope-semibold text-3xl pt-2 sm:pt-4'>Examples</h1>
                            <div className='flex flex-col justify-center gap-16 ml-6 sm:ml-6 mt-20 sm:mt-20 mr-2'>
                                {exampleBooks.map((book, index) => (
                                    <ExampleNote key={index} book={book} />
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    );
};

export default Notes;
