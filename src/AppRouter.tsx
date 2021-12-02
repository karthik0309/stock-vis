import React, { lazy, Suspense } from 'react'
import { Routes, Route,BrowserRouter} from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarController,
    BarElement,
    Legend,
    Filler
} from 'chart.js'
import './App.css'

const Home = lazy(()=>import('./pages/home/Home'))
const StockDetails =lazy(()=>import('./components/stockHistory/StockHistory'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/stocks/:id" element={<StockDetails/>}/>
            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    Tooltip,
    Legend,
    Filler
)

export default AppRouter
