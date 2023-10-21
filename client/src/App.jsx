import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

import { ReadingListProvider } from './context/ReadingListContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ConnectDots from './pages/ConnectDots';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReadingListProvider>
                <BrowserRouter>
                    <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/notes" element={<ConnectDots />} />
                    </Route>
                    <Route path="*" component={<div>404 NOT FOUND</div>} />
                    </Routes>
                </BrowserRouter>
            </ReadingListProvider>
        </QueryClientProvider>
    );
}

export default App;
