import {useContext, useState, useEffect } from "react"
import { Context } from "../../Context/Context"
import "./products.css"

const Products = () => {
    const [products, setProducts ] = useState([])
    const {buyProducts} = useContext(Context)

    useEffect(() => {
        fetch("data.json")
        .then((response) => response.json())
        .then((data) => setProducts(data))
    }, [])


return products.map((product) => {
    return (
        <div className="card" key={product.id}>
            <img src={product.img} alt="img-product-card" />
            <h3>{product.name}</h3>
            <h4>{product.price}</h4>
            <button onClick={() => buyProducts(product)}>buy</button>
        </div>
    )
})
}

export default Products