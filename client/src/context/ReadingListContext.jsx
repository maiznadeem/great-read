import React, { createContext, useContext, useState } from 'react';

const ReadingListContext = createContext();

export function useReadingList() {
    return useContext(ReadingListContext);
}

export function ReadingListProvider({ children }) {
    const [isReadingListActive, setIsReadingListActive] = useState(false);
    const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [goal, setGoal] = useState('');
    const [readingInfo, setReadingInfo ] = useState(false);
    const [books, setBooks] = useState([]);

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

    const setReadingInfoValue = (newValue) => {
        setReadingInfo(newValue);
    };

    const setBooksValue = (newValue) => {
        setBooksValue(newValue);
    };

    const toggleReadingInfo = () => {
        setReadingInfoValue((prevState) => !prevState);
    };

    return (
        <ReadingListContext.Provider value={{
            isReadingListActive,
            toggleReadingList,
            name,
            period,
            goal,
            readingInfo,
            books,
            setNameValue,
            setPeriodValue,
            setGoalValue,
            setReadingInfoValue,
            setBooksValue,
            toggleReadingInfo,
        }}>
            {children}
        </ReadingListContext.Provider>
    );
}
