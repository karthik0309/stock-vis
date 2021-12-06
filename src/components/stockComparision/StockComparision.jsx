import React from 'react'
import { Radar } from 'react-chartjs-2'
import classes from './StockComparision.module.css'

const options={
  elements: {
    line: {
      borderWidth: 3
    }
  }
}

const StockComparision = ({stock1,stock2}) => {

    const data = {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running'
        ],
        datasets: [
          {
            label: stock1,
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, 
          {
            label: stock2,
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }
        ]
    }
      
    
    return (
        <>
          {stock2!=='' &&
            <div>
              <div className={classes.compare__to}>
                {stock2}
              </div>
              <div className={classes.chart}>
                <Radar data={data} options={options} /> 
              </div>
            </div>
          }
        </>
    )
}

export default StockComparision
