import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ConnectDots from './pages/ConnectDots'

function App() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/connectdots" element={<ConnectDots />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
