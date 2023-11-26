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
            customOrange: {
                main: '#FFA500',
            },
        },
        typography: {
            allVariants: {
                fontFamily: 'Manrope',
            },
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontFamily: 'Manrope',
                        fontSize: 12,
                        backgroundColor: 'white',
                        color: 'black',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    },
                },
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
