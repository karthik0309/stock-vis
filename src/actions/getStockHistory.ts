import axios from "axios"
import { ACCESS_KEY, MARCKET_STACK_API } from "../backend"

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