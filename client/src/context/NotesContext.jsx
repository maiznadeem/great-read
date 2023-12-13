import React, { createContext, useContext, useEffect, useState } from 'react';

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
    const [books, setBooks] = useState([]);

    return (
        <NotesContext.Provider value={{
            selectedButton,
            setSelectedButton,
            previewOptions,
            setPreviewOptions,
            books,
            setBooks,
        }}>
            {children}
        </NotesContext.Provider>
    );
}
