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
    RadarController,
    RadialLinearScale,
    Legend,
    Filler
} from 'chart.js'

import './App.css'

const Home = lazy(()=>import('./pages/home/Home'))
const StockDetails =lazy(()=>import('./pages/stockDetails/StockDetails'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/stocks/:id/:name" element={<StockDetails/>}/>
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
    Filler,
    RadialLinearScale,
    RadarController
)
export default AppRouter
