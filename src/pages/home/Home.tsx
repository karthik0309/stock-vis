import React from 'react'
import { Link } from 'react-router-dom'
import BG from '../../assets/bg1.png'
import Info1 from '../../assets/info1.png'
import Info2 from '../../assets/info2.png'
import Info3 from '../../assets/info3.png'
import Info4 from '../../assets/info4.png'
import Button from '../../components/button/Button'
import InfoCard from '../../components/infoCard/InfoCard'
import { infoData,AboutUs,Video } from '../../constants/constant'
import classes from './Home.module.css'

const Img=[Info1,Info3,Info2,Info4]

const Home = () => {
  return (
    <div className={classes.main__container}>
        <div className={classes.bg}>
            <img src={BG} alt="background"/>
        </div>
        <div className={classes.intro}>
            <h2>Welcome to STOX</h2>
            <p>
            Stox, an online stock trading platform, is a trustworthy stock broker and one of the best trading apps in India, by people's choice.
            </p>
            <Link to="/stocks">
                <Button value="Start Trading" onClick={()=>{}}/>        
            </Link>
        </div>
        <div className={classes.info__cards}>
            {infoData.map((info,index)=>(
                <InfoCard img={Img[index]} info={info.info} description={info.desc} key={index}/>
            ))}
        </div>
        <div className={classes.footer}>
            <img src={Video} alt="about us"/>
            <div className={classes.about__us}>
                <h2>What we do?</h2>
                <p>{AboutUs}</p>
            </div>
        </div>
    </div>
  )
}

export default Home