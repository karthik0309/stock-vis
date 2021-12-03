import React from 'react'
import classes from './stockNewsCard.module.css'

interface StockNewsType{
    stockNews:any[]
}

const StockNewsCard:React.FC<StockNewsType> = ({stockNews}) => {

    const handleCardClick=(url:string)=>{
        window.open(url,"_blank")
    }

    console.log(stockNews)
    return (
        <>
        <h2 className={classes.h2}>Top Stories</h2>
        <div className={classes.news_card__container}>
            {stockNews && stockNews.length>0 && stockNews.map((news)=>(
                <div id="news-card" className={classes.news__card} key={news.uuid} onClick={()=>handleCardClick(news.url)}>
                    <div className="news__img">
                        <img src={news.image_url} alt="" className={classes.img}/>
                    </div>
                    <div className={classes.new__info}>
                        <h3 className={classes.news__title}>
                            {news.title}
                        </h3>
                        <p className={classes.news__description}>
                            {news.description}
                        </p>
                    </div>

                </div>
            ))}
        </div>
        </>
    )
}

export default StockNewsCard


//https://stocknewsapi.com/