import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { getStockDataInThePeriod } from '../../actions/getStockHistory'

const options={
    scales: {
        x:{
            ticks:{
                callback: function(value, index, values) {
                    return '';
                }
            },
            grid:{
                color:"#fff"
            }
        },
        y:{
            grid:{
                color:"#fff"
            }
        }
    }
}

const StockHistory = ({}) => {

    const [timeLine,setTimeLine] = useState({
        tillDate:'',
        fromDate:''
    })

    const stockSymbol = useParams()

    console.log(stockSymbol)
    const [currStockData,setCurrStockData] = useState([])
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
            getStockDataInThePeriod(stockSymbol.id,timeLine.fromDate,timeLine.tillDate)
            .then((res)=>{
                setCurrStockData(res.data)
                handleLinChartDetails(res.data)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleLinChartDetails=(stockData)=>{
        const data= {
            labels:stockData.map(stock=>stock.date),
            datasets: [{
                label: stockSymbol.id,
                data: stockData.map(stock=>stock.close),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2
            }],
            
        }
        console.log(data.datasets[0].data)
        setLineChartDetails(data)
    }

    useEffect(()=>{
        setUTCDate('1D')
        fetchCurrStockData()
    },[])


    return (
        <div>
            {Object.keys(lineChartDetails).length>1 && <Line data={lineChartDetails} options={options}/>}
        </div>
    )
}

export default StockHistory
