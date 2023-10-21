import React, { createContext, useContext, useState } from 'react';

const ReadingListContext = createContext();

export function useReadingList() {
    return useContext(ReadingListContext);
}

export function ReadingListProvider({ children }) {
    const [isReadingListActive, setIsReadingListActive] = useState(false);

    const toggleReadingList = () => {
        setIsReadingListActive((prevState) => !prevState);
    };

    return (
        <ReadingListContext.Provider value={{ isReadingListActive, toggleReadingList }}>
            {children}
        </ReadingListContext.Provider>
    );
}
