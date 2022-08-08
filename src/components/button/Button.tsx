import React from 'react'
import classes from './Button.module.css'

type IButton={
    value:string,
    type?:string,
    onClick:()=>void
}

const Button:React.FC<IButton> = ({value,type,onClick}) => {
  return (
    <button className={type!=null ? classes.filled :classes.button} onClick={onClick}>
        {value}
    </button>
  )
}

export default Button