import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"

function Home(){

  const [products,setProducts] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{

    fetch("http://localhost:3001/products")
    .then(res=>{

      if(!res.ok){
        throw new Error("Server error")
      }

      return res.json()

    })
    .then(data=>{

      setProducts(data)
      setLoading(false)

    })
    .catch(err=>{

      setError(err.message)
      setLoading(false)

    })

  },[])

  const deleteProduct=(id)=>{

    fetch(`http://localhost:3001/products/${id}`,{
      method:"DELETE"
    })
    .then(()=>{
      setProducts(products.filter(p=>p.id !== id))
    })

  }

  const logout=()=>{

    localStorage.removeItem("auth")
    window.location.href="/login"

  }

  const getStatusClass=(status)=>{

    if(status==="Safe") return "safe"
    if(status==="Risk") return "risk"
    return "checking"

  }

  const getProductIcon=(name)=>{

    const lower=name.toLowerCase()

    if(lower.includes("milk")) return "🥛"
    if(lower.includes("meat")) return "🥩"
    if(lower.includes("fish")) return "🐟"
    if(lower.includes("apple")) return "🍎"
    if(lower.includes("chicken")) return "🍗"

    return "🍽️"
  }

  /* поиск С УЧЕТОМ РЕГИСТРА */

  const filteredProducts = products.filter(product =>
    product.name.includes(search)
  )

  if(loading) return <Spinner/>

  if(error) return <div className="error">{error}</div>

  return(

    <div className="container">

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <div className="title">
          Food Safety Control
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <input
        className="searchBox"
        placeholder="Search products..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />

      <Link to="/add">
        <button className="addBtn">
          Add Product
        </button>
      </Link>

      <table className="productTable">

        <thead>

          <tr>
            <th>Product</th>
            <th>Manufacturer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

        {filteredProducts.map(product=>(

          <tr key={product.id}>

            <td>

              <span className="productIcon">
                {getProductIcon(product.name)}
              </span>

              {product.name}

            </td>

            <td>
              {product.manufacturer}
            </td>

            <td>

              <span className={`statusBadge ${getStatusClass(product.safetyStatus)}`}>
                {product.safetyStatus}
              </span>

            </td>

            <td className="buttons">

              <Link to={`/detail/${product.id}`}>
                <button className="detailBtn">
                  Detail
                </button>
              </Link>

              <Link to={`/edit/${product.id}`}>
                <button className="editBtn">
                  Edit
                </button>
              </Link>

              <button
                className="deleteBtn"
                onClick={()=>deleteProduct(product.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

        </tbody>

      </table>

    </div>

  )

}

export default Home