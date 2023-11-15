import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';

import { ReadingListProvider } from './context/ReadingListContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';

const queryClient = new QueryClient();

function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#956829',
            },
            error: {
                main: '#CC0000',
            },
        },
        typography: {
            allVariants: {
                fontFamily: 'Manrope',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                    <ReadingListProvider>
                        <BrowserRouter>
                            <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/notes" element={<Notes />} />
                            </Route>
                            <Route path="*" component={<div>404 NOT FOUND</div>} />
                            </Routes>
                        </BrowserRouter>
                    </ReadingListProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
