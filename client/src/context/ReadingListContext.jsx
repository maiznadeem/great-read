import React, { createContext, useContext, useEffect, useState } from 'react';

const ReadingListContext = createContext();

export function useReadingList() {
    return useContext(ReadingListContext);
}

export function ReadingListProvider({ children }) {
    const [isReadingListActive, setIsReadingListActive] = useState(
        JSON.parse(sessionStorage.getItem('isReadingListActive')) || false
    );
    const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [goal, setGoal] = useState('');
    const [selectionChoice, setSelectionChoice] = useState('');
    const [readingInfo, setReadingInfo ] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('isReadingListActive', JSON.stringify(isReadingListActive));
    }, [isReadingListActive]);

    const toggleReadingList = () => {
        setIsReadingListActive((prevState) => !prevState);
    };

    const setNameValue = (newName) => {
        setName(newName);
    };

    const setPeriodValue = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const setGoalValue = (newGoal) => {
        setGoal(newGoal);
    };

    const setSelectionChoiceValue = (newSelection) => {
        setSelectionChoice(newSelection);
    }

    const setReadingInfoValue = (newValue) => {
        setReadingInfo(newValue);
    };

    const setBooksValue = (newValue) => {
        setBooks([...books, ...newValue]);
    };

    const updateBooksValue = (newValue) => {
        setBooks(newValue);
    };

    const setSelectedCategoriesValue = (newValue) => {
        setSelectedCategories(newValue);
    };

    const toggleReadingInfo = () => {
        setReadingInfoValue((prevState) => !prevState);
    };

    const togglePageRefresh = () => {
        setPageRefresh((prevState) => !prevState);
    };

    return (
        <ReadingListContext.Provider value={{
            isReadingListActive,
            toggleReadingList,
            name,
            period,
            goal,
            selectionChoice,
            readingInfo,
            books,
            selectedCategories,
            pageRefresh,
            setNameValue,
            setPeriodValue,
            setGoalValue,
            setSelectionChoiceValue,
            setReadingInfoValue,
            setBooksValue,
            updateBooksValue,
            setSelectedCategoriesValue,
            toggleReadingInfo,
            togglePageRefresh,
        }}>
            {children}
        </ReadingListContext.Provider>
    );
}
