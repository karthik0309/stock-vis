import {useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { getStockDataInThePeriod,getStockHeadlines } from '../../actions/stockInfo/index'
import  MSFTStockData from '../../json/export.json'
import StockNewsCard from '../stockCard/StockNewsCard.tsx'
import classes from './stockHitory.module.css'

const options={
    scales: {
        x:{
            ticks:{
                callback: function(value, index, values) {
                    return '';
                }
            },
            grid:{
                color:""
            }
        }, 
        y:{
            grid:{
                color:"rgb(48,49,52)"
            },
            ticks:{
                callback: function(value, index, values) {
                    return '$'+value;
                },
                color: "#fff"
            },
        }  
    }
}

const chartColors={
    loss:{
        background:'rgba(242, 139, 130,0.8)',
        border:'rgb(242, 139, 130)'
    },
    gain:{
        background: 'rgba(129, 201, 149,0.8)',
        border: 'rgb(129, 201, 149)'
    }
}

const StockHistory = ({stockSymbol,stockName}) => {

    const [timeLine,setTimeLine] = useState({
        tillDate:'',
        fromDate:''
    })

    const [currTimeLine,setCurrTimeLine]=useState('1Y')
    const [currStockData,setCurrStockData] = useState([])
    const [stockNews,setStockNews]=useState([])
    const [errors,setErrors]=useState('')
    const [gainInStock,setGainInStock]=useState({
        type:'',
        gain:0
    })
    const [lineChartDetails,setLineChartDetails]=useState({})

    const setUTCDate=(type)=>{
        const date  = new Date()
        let year  = date.getUTCFullYear()
        let month = date.getUTCMonth() + 1
        let day   = date.getUTCDate();

        const from = `${year}-${month}-${day}`
        
        year  = type && type.includes("Y") ? date.getUTCFullYear()- parseInt(type.charAt(0)) : year
        month = type && type.includes("M") ? date.getUTCMonth()+1===1 ? (year-=1,month=12) : date.getUTCMonth()-parseInt(type.charAt(0))+1 : month
        day   = type && type.includes("D") ? date.getUTCDate()===1 ? (day=30,month-=1) : date.getUTCDate()-parseInt(type.charAt(0)) : day


        const till = `${year}-${month}-${day}`

        setTimeLine({fromDate:from,tillDate:till})
    }

    const fetchCurrStockData=()=>{
        try{
            // getStockDataInThePeriod(stockSymbol,timeLine.fromDate,timeLine.tillDate)
            // .then((res)=>{
                const stockData = MSFTStockData
                const difference = stockData[0].close - stockData[stockData.length-1].close
                const type = difference<0 ? 'loss' : 'gain'
                setCurrStockData(stockData)
                setGainInStock({gain:difference,type:type})

                handleLinChartDetails(stockData.reverse(),type)
                console.log(stockData)
            //})
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchStockNews=()=>{
        try{
            getStockHeadlines(stockSymbol).then((res)=>{
                if(res.status===429 || res.status===500){
                    setErrors('Unable to fetch stock news')
                    return
                }
                setStockNews(res.data.data)
            })
        }catch(err){

        }
    }

    const handleLinChartDetails=(stockData,type)=>{
        const data= {
            labels:stockData.map(stock=>stock.date),
            datasets: [{
                label: stockSymbol,
                data: stockData.map(stock=>stock.close),
                fill: true,
                backgroundColor: chartColors[type].background,
                borderColor: chartColors[type].border,
                borderWidth: 2
            }],
            
        }
        setLineChartDetails(data)
    }

    useEffect(()=>{
        setUTCDate(currTimeLine)
        fetchCurrStockData()
        fetchStockNews()
    },[])

    console.log()

    return (
        <>
        <div className={classes.chart__container}>
            {Object.keys(lineChartDetails).length>1 && 
                <Line 
                data={lineChartDetails} 
                options={options} 
                />
            }
        </div>
        <StockNewsCard stockNews={stockNews}/>
        </>
    )
}

export default StockHistory
