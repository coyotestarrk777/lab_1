import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddProduct(){

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [manufacturer,setManufacturer] = useState("")
  const [status,setStatus] = useState("Safe")
  const [date,setDate] = useState("")
  const [error,setError] = useState("")

  const handleSubmit = (e)=>{

    e.preventDefault()

    if(!name || !manufacturer || !date){
      setError("Please fill all fields")
      return
    }

    const product = {

      name,
      manufacturer,
      safetyStatus:status,
      expirationDate:date

    }

    fetch("http://localhost:3001/products",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(product)

    }).then(()=>navigate("/"))

  }

  return(

    <div className="container">

      <div className="formContainer">

        <h2 className="formTitle">Add Product</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="formGroup">
            <label>Product Name</label>
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
            <label>Safety Status</label>
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
            <label>Expiration Date</label>
            <input
              type="date"
              value={date}
              onChange={e=>setDate(e.target.value)}
            />
          </div>

          <button className="formBtn">
            Save Product
          </button>

        </form>

      </div>

    </div>

  )

}

export default AddProduct
