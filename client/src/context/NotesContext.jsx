import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export function useNotes() {
    return useContext(NotesContext);
}

export function NotesProvider({ children }) {

    const [selectedButton, setSelectedButton] = useState(null);
    const [previewOptions, setPreviewOptions] = useState({
        notes: true,
        links: true,
        label: true,
    })
    const [notesCategories, setNotesCategories] = useState([]);
    const [notesBooks, setNotesBooks] = useState([]);
    const [urls, setUrls] = useState({
        address: [],
        timeCreated: null,
    });

    function addBook(newBook) {
        setNotesBooks([...notesBooks, newBook]);
    }

    return (
        <NotesContext.Provider value={{
            selectedButton,
            setSelectedButton,
            previewOptions,
            setPreviewOptions,
            notesCategories,
            setNotesCategories,
            notesBooks,
            setNotesBooks,
            urls,
            setUrls,
            addBook,
        }}>
            {children}
        </NotesContext.Provider>
    );
}
