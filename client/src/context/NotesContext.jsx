import React, { createContext, useContext, useEffect, useState } from 'react';

const NotesContext = createContext();

export function useNotes() {
    return useContext(NotesContext);
}

export function NotesProvider({ children }) {

    const selectedButtonData = JSON.parse(sessionStorage.getItem('selectedButton')) || null;
    const previewOptionsData = JSON.parse(sessionStorage.getItem('previewOptions')) || {
        notes: true,
        links: true,
        label: true,
    };
    const urlsData = JSON.parse(sessionStorage.getItem('urls')) || {
        address: [],
        timeCreated: null,
    };
    const notesCategoriesData = JSON.parse(sessionStorage.getItem('notesCategories')) || [];
    const notesBooksData = JSON.parse(sessionStorage.getItem('notesBooks')) || [];

    const [selectedButton, setSelectedButton] = useState(selectedButtonData);
    const [previewOptions, setPreviewOptions] = useState(previewOptionsData);
    const [notesCategories, setNotesCategories] = useState(notesCategoriesData);
    const [notesBooks, setNotesBooks] = useState(notesBooksData);
    const [urls, setUrls] = useState(urlsData);
    const [urlsLoading, setUrlsLoading] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('selectedButton', JSON.stringify(selectedButton));
        sessionStorage.setItem('previewOptions', JSON.stringify(previewOptions));
        sessionStorage.setItem('urls', JSON.stringify(urls));
        sessionStorage.setItem('notesCategories', JSON.stringify(notesCategories));
        sessionStorage.setItem('notesBooks', JSON.stringify(notesBooks));
    }, [selectedButton, previewOptions, urls, notesCategories, notesBooks]);

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
            urlsLoading,
            setUrlsLoading,
            addBook,
        }}>
            {children}
        </NotesContext.Provider>
    );
}
