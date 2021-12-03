import React from 'react'
import { generatePath, useNavigate } from 'react-router'
import './Table.css'

interface Props{
    thead: string[],
    tbody: string[][],
    filterText?:string
}

const Table:React.FC<Props> = ({thead,tbody,filterText}) => {

    const navigate = useNavigate()

    const handleRoutes=(id:string,name:string)=>{
        navigate(generatePath('/stocks/:id/:name=',{ id ,name}))
    }
    
    return (
        <div className="main__container">
            <table className="table__container">
            <thead>
                <tr>
                    {thead.map((ele,index)=>(
                        <th key={index}>{ele}</th>
                    ))}
                </tr>    
            </thead>
            <tbody>
                {filterText!=='' ? tbody.filter((ele:any)=>(
                    ele.name.toLowerCase().includes(filterText?.toLowerCase())
                )).map((ele:any,index)=>(
                    <tr key={index} onClick={()=>handleRoutes(ele.symbol,ele.name)}>
                        <td>{ele.symbol}</td>
                        <td>{ele.name}</td>
                        <td>{ele.stock_exchange.acronym}</td>
                        <td>{ele.stock_exchange.country}</td>
                    </tr>
                )): tbody.map((ele:any,index)=>(
                    <tr key={index} onClick={()=>handleRoutes(ele.symbol,ele.name)}>
                        <td>{ele.symbol}</td>
                        <td>{ele.name}</td>
                        <td>{ele.stock_exchange.acronym}</td>
                        <td>{ele.stock_exchange.country}</td>
                    </tr>))}
            </tbody>
        </table>
        </div>
    )
}

export default Table
