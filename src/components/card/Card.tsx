import React from 'react'
import classes from './Card.module.css'

interface CardInfo{
    title:string,
    gain:number,
    description:string
}

const Card:React.FC<CardInfo> = ({title,gain,description}) => {
    return (
        <div className={classes.card__container}>
            
        </div>
    )
}

export default Card
