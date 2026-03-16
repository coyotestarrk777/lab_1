import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

function Detail() {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    fetch(`http://localhost:3001/products/${id}`)
      .then(res => {

        if(!res.ok){
          throw new Error("Product not found")
        }

        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })

  }, [id])

  if(loading) return <Spinner/>

  if(error) return <div className="error">{error}</div>

  return (

    <div className="container">

      <div className="detailCard">

        <h2>{product.name}</h2>

        <div className="detailItem">
          <strong>Manufacturer:</strong> {product.manufacturer}
        </div>

        <div className="detailItem">
          <strong>Safety Status:</strong> {product.safetyStatus}
        </div>

        <div className="detailItem">
          <strong>Expiration Date:</strong> {product.expirationDate}
        </div>

      </div>

    </div>

  )

}

export default Detail