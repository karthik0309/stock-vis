import axios from "axios"
import { ACCESS_KEY, MARCKET_STACK_API } from "../backend"

export const getAllStocks=async()=>{
    try{
        const response = await axios.get(`${MARCKET_STACK_API}/v1/tickers?access_key=${ACCESS_KEY}`)

        return response.data
    }catch(err){
        throw err
    }
}