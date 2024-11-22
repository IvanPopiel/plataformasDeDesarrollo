import Banner from "../Banner/Banner"
import NavBar from "../NavBar/NavBar"
import Products from "../Products/Products"

const Home = () => {
    return(
        <>
        <NavBar/>
        <Banner/>
        <div className="product-card-container">
        <Products/>
        </div>
        </>
    )
}

export default Home