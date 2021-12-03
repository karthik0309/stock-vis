import axios from "axios"
import { ACCESS_KEY, MARCKET_STACK_API,MARKET_TAUX_API_KEY,MARKET_TAUX_API } from "../../backend"

export const getAllStocks=async()=>{
    try{
        const response = await axios.get(`${MARCKET_STACK_API}/v1/tickers?access_key=${ACCESS_KEY}`)

        return response.data
    }catch(err){
        throw err
    }
}


export const getStockDataInThePeriod=async(stock:string,from:string,till:string)=>{
    try{
        const response= await axios.get(`${MARCKET_STACK_API}/v1/eod?access_key=${ACCESS_KEY}`,{params:{
            date_from:from,
            date_to:till,
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