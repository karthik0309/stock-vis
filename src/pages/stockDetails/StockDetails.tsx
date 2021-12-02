import React from 'react'
import { useParams } from 'react-router-dom'
import StockHistory from '../../components/stockHistory/StockHistory'


const StockDetails = () => {

    const stockSymbol = useParams()

    return (
        <div>
            <StockHistory stockSymbol={stockSymbol.id}/>            
        </div>
    )
}

export default StockDetails
