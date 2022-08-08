import React from 'react'
import classes from './InfoCard.module.css'

type IInfoCard={
    img:any,
    info:string,
    description:string,
}

const InfoCard:React.FC<IInfoCard> = ({img,info,description}) => {
  return (
    <div className={classes.main__container}>
        <div className={classes.img}>
            <img src={img} alt="" />
        </div>
        <div className={classes.info}>
            <h3>{info}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default InfoCard