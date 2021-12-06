import {useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { getStockDataInThePeriod,getStockHeadlines } from '../../actions/stockInfo/index'
import  MSFTStockData from '../../json/export.json'
import Card from '../card/Card'
import StockComparision from '../stockComparision/StockComparision'
// import StockNewsCard from '../stockCard/StockNewsCard.tsx'
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
    const [stockNames,setStockName]=useState([])
    const [currStockData,setCurrStockData] = useState([])
    const [filteredStock,setFilteredStock]=useState('')
    const [selectedFilter,setSelectedFilter]=useState('')
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
                const difference = stockData[0].close - stockData[1].close
                const prevDifference = ((stockData[0].close - stockData[1].close)/stockData[0].close)*100
                const type = difference<0 ? 'loss' : 'gain'
                setCurrStockData(stockData)
                setGainInStock({gain:difference,
                    type:type,
                    prevDifference:prevDifference,
                    closedAt:stockData[0].close})

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
        //fetchStockNews()

        const stocks=JSON.parse(localStorage.getItem('item'))
        setStockName(stocks)
    },[])

    console.log()

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

            <div id="comparison" className={classes.comparision__container}>
                <h2>Compare with other stocks</h2>
                <input type="text"  className={classes.comparision__text_box} 
                onChange={e=>setFilteredStock(e.target.value)}
                value={filteredStock}/>
                {filteredStock.length>0 && filteredStock.length<4 &&
                    <div className={classes.filtered__text}>
                        {stockNames.filter(names=>names.symbol.toLowerCase().includes(filteredStock.toLowerCase()))
                            .map((stock)=>(
                                <p className={classes.stock__name} key={stock.name} 
                                onClick={()=>{
                                    setSelectedFilter(stock.symbol)
                                    setFilteredStock(stock.symbol)
                                }}>
                                    {stock.symbol}
                                </p>
                            ))
                        }
                    </div>
                }
                <StockComparision stock1={stockSymbol} stock2={selectedFilter}/>
            </div>
            {/* <StockNewsCard stockNews={stockNews}/> */}

        </div>
    )
}

export default StockHistory
