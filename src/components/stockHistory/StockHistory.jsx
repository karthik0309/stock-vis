import {useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { getStockDataInThePeriod,getStockHeadlines,getIntraDayStockData } from '../../actions/stockInfo/index'
import Button from '../button/Button'
import Card from '../card/Card'
import StockNewsCard from '../stockCard/StockNewsCard.tsx'
import classes from './stockHitory.module.css'

const options={
    scales: { 
        y:{
            grid:{
                color:"#fff"
            },
            ticks:{
                callback: function(value, index, values) {
                    return '$'+value;
                },
                color: "#333333"
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

    const [currTimeLine,setCurrTimeLine]=useState('Y')
    const [stockNames,setStockName]=useState([])
    const [currStockData,setCurrStockData] = useState([])
    const [stockNews,setStockNews]=useState([])
    const [errors,setErrors]=useState('')
    const [gainInStock,setGainInStock]=useState({
        type:'',
        gain:0,
        prevDifference:0,
        closedAt:0
    })
    const [lineChartDetails,setLineChartDetails]=useState({})

    const setUTCDate=(type)=>{
        const date  = new Date()
        let year  = date.getUTCFullYear()
        let month = date.getUTCMonth() + 1
        let day   = date.getUTCDate();     
        const from = `${year}-${month<10 ? '0'+month : month}-${day<10 ? '0'+day : day}`
        
        year  = type && type.includes("Y") ? date.getUTCFullYear()- 1 : year
        month = type && type.includes("M") ? date.getUTCMonth()+1===1 ? (year-=1,month=12) : date.getUTCMonth() : month
        day   = type && type.includes("D") ? date.getUTCDate()===1 ? (day=30,month-=1) : date.getUTCDate()-1 : day


        const till = `${year}-${month<10 ? '0'+month : month}-${day<10 ? '0'+day : day}`

        setTimeLine({fromDate:from,tillDate:till})
        if(type.includes("D")){
            fetchIntraDay(from,till)
        }else{
            fetchCurrStockData(from,till)
        }
    }


    const fetchCurrStockData=(from, till)=>{
        try{
            getStockDataInThePeriod(stockSymbol,from,till)
            .then((res)=>{
                const stockData = res.data
                const difference = stockData[0].close - stockData[1].close
                const prevDifference = ((stockData[0].close - stockData[1].close)/stockData[0].close)*100
                const type = difference<0 ? 'loss' : 'gain'
                setCurrStockData(stockData)
                setGainInStock({gain:difference,
                    type:type,
                    prevDifference:prevDifference,
                    closedAt:stockData[0].close})

                handleLinChartDetails(stockData.reverse(),type)
                // console.log(stockData)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchIntraDay=(from, till)=>{
        try{
            getIntraDayStockData(stockSymbol,from,till)
            .then((res)=>{
                const stockData = res.data
                // console.log(stockData[0])
                const difference = stockData[0].close - stockData[1].close
                const prevDifference = ((stockData[0].close - stockData[1].close)/stockData[0].close)*100
                const type = difference<0 ? 'loss' : 'gain'
                setCurrStockData(stockData)
                setGainInStock({gain:difference,
                    type:type,
                    prevDifference:prevDifference,
                    closedAt:stockData[0].close})

                handleLinChartDetails(stockData.reverse(),type)
            })
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
            labels:stockData.map(stock=>stock.date.substring(0,10)),
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
        fetchCurrStockData(timeLine.fromDate,timeLine.tillDate)
        fetchStockNews()
        const stocks=JSON.parse(localStorage.getItem('item'))
        setStockName(stocks)
    },[])


    return (
        <div className={classes.main__container}>
            <div id="info" className={classes.info}>
                <div className={classes.chart__container}>
                    {Object.keys(lineChartDetails).length>1 && 
                        <Line 
                        data={lineChartDetails} 
                        options={options} 
                        />
                    }
                </div>
                <div className={classes.info__container}>
                    <Card title={stockName} 
                    prevDifference={gainInStock.prevDifference} 
                    gain={gainInStock.gain}
                    closedAt={gainInStock.closedAt}/>
                </div>
            </div>

            <div id="button" className={classes.button__container}>
                <Button className={classes.button} value="1Day" onClick={()=>setUTCDate("D")} type="filled"/>
                <Button className={classes.button} value="1Month" onClick={()=>setUTCDate("M")} type="filled"/>
                <Button className={classes.button} value="1Year" onClick={()=>setUTCDate("Y")} type="filled"/>
            </div>
            <StockNewsCard stockNews={stockNews}/>

        </div>
    )
}

export default StockHistory
