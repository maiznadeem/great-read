import React from 'react'
import { useNotes } from '../../context/NotesContext'

const Slab = () => {

    const { selectedButton, books } = useNotes();

    let total = 10;
    let categories = 1

    if(selectedButton == 2) {
        categories = 3
    }
    if(selectedButton == 3){
        total = 30;
        categories = Infinity;
    }

    return (
        <div className='text-black my-20 flex flex-col sm:flex-row justify-center items-center gap-10'>
            <div className='w-72 h-96 bg-footer rounded-2xl shadow-xl flex justify-center items-center'>
                <p>Select books from <button>below</button></p>
            </div>
            <div>
                <p>Hi, you have {total - books.length} {total - books.length == 1 ? 'book' : 'books'} left to choose from {categories == Infinity ? 'any' : `${categories}`} { categories == 1 || categories == Infinity ? 'category' : 'categories'}</p>
                <button>Purchase</button>
            </div>
        </div>
    )
}

export default Slab