import axios from "axios"
import { ACCESS_KEY, MARCKET_STACK_API,MARKET_TAUX_API_KEY,MARKET_TAUX_API } from "../../backend"

export const getAllStocks=async()=>{
    try{
        const response = await axios.get(`${MARCKET_STACK_API}/`)

        return response.data
    }catch(err){
        throw err
    }
}


export const getStockDataInThePeriod=async(stock:string,from:string,till:string)=>{
    try{
        const response= await axios.get(`${MARCKET_STACK_API}/stock`,{params:{
            date_from:till,
            date_to:from,
            symbols:stock
        }})
        return response.data
    }
    catch(err){
        throw err
    }    
}

export const getIntraDayStockData=async(stock:string,from:string,till:string)=>{
    try{
        const response= await axios.get(`${MARCKET_STACK_API}/stock/intra-day`,{params:{
            symbols:stock
        }})
        return response.data
    }
    catch(err){
        throw err
    } 
}

export const getStockHeadlines=async(stockName:string)=>{
    try{
        return await axios.get(`${MARKET_TAUX_API}/v1/news/all`,{params:{
            api_token:MARKET_TAUX_API_KEY,
            filter_entities:true,
            language:'en',
            symbols:stockName
        }})
    }catch(err){
        throw err
    } 
}