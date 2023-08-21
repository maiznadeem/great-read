import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'

function App() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
