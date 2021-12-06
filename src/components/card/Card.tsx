import React from 'react'
import { gainImages } from '../../constants/constant'
import classes from './Card.module.css'
interface CardInfo{
    title:string,
    gain:number,
    prevDifference:number,
    closedAt:number
}

const round=(num:number)=>{
    return Math.round((num + Number.EPSILON)*100)/100
}

const Card:React.FC<CardInfo> = ({title,gain,prevDifference,closedAt}) => {
    return (
        <div className={classes.card__container}>
            <div className={classes.image}>
                <img src={gain>0 ? gainImages.gain : gainImages.loss} alt={title} />
            </div>
            <div className={classes.info}>
                <h2 className={classes.title}>
                    {title.split(" ")[0]}
                </h2>
                <p className={classes.closing__price}>
                    closed at:{closedAt}
                </p>
                <p className={classes.differencs} style={{color:gain>0?'rgb(129, 201, 149)':'rgb(242, 139, 130)'}}>
                    {`${round(gain)}(${round(prevDifference)})`}%
                </p>
            </div>
        </div>
    )
}

export default Card
