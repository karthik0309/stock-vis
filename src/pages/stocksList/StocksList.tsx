import StockDetails from '../../components/stockDetails/StockDetails'
import BG from '../../assets/bg1.png'
import './stocksList.css'

const Home = () => {
  return (
    <div id="home">
      <div className="bg">
        <img src={BG} alt="background"/>
      </div>
      <StockDetails/>
    </div>
  )
}



export default Home
