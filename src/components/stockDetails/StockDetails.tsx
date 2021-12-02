import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Table from '../table/Table'
import { mainTableHead } from '../../constants/constant'
import './StockDetails.css'
import { getAllStocks } from '../../actions/getAllStocks'

const StockDetails = () => {
    const [stockInfo,setStockInfo] = useState([])
    const [filter,setFilter] = useState('')

    const fetchAllStocks = async()=>{
        try{
            getAllStocks().then((res=>{
                setStockInfo(res.data)
            }))
        }catch(e){
            console.log(e)
        }
    }

    const handleFilterChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFilter(e.target.value)
    }

    useEffect(()=>{
        fetchAllStocks()
    },[])
    
    return (
        <div className="main__container">
            <input type="text" 
            className="stock__filter" 
            placeholder="filter stocks by name"
            onChange={e=>handleFilterChange(e)}
            value={filter}/>
            <Table thead={mainTableHead} 
            tbody={stockInfo} 
            filterText={filter}/>
        </div>
    )
}

export default StockDetails