import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

function EditProduct(){

  const {id} = useParams()
  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [manufacturer,setManufacturer] = useState("")
  const [status,setStatus] = useState("")
  const [date,setDate] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    fetch(`http://localhost:3001/products/${id}`)
    .then(res=>res.json())
    .then(data=>{

      setName(data.name)
      setManufacturer(data.manufacturer)
      setStatus(data.safetyStatus)
      setDate(data.expirationDate)

      setLoading(false)

    })

  },[id])

  const handleSubmit=(e)=>{

    e.preventDefault()

    const product={

      name,
      manufacturer,
      safetyStatus:status,
      expirationDate:date

    }

    fetch(`http://localhost:3001/products/${id}`,{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(product)

    }).then(()=>navigate("/"))

  }

  if(loading) return <Spinner/>

  return(

    <div className="container">

      <div className="formContainer">

        <h2 className="formTitle">Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="formGroup">
            <label>Name</label>
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Manufacturer</label>
            <input
              value={manufacturer}
              onChange={e=>setManufacturer(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Status</label>
            <select
              value={status}
              onChange={e=>setStatus(e.target.value)}
            >
              <option>Safe</option>
              <option>Checking</option>
              <option>Risk</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Expiration</label>
            <input
              type="date"
              value={date}
              onChange={e=>setDate(e.target.value)}
            />
          </div>

          <button className="formBtn">
            Update Product
          </button>

        </form>

      </div>

    </div>

  )

}

export default EditProduct