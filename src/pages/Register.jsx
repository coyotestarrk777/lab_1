import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register(){

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const handleRegister=(e)=>{

    e.preventDefault()

    if(!username || !password){
      setError("Please fill all fields")
      return
    }

    fetch("http://localhost:3001/users")
    .then(res=>res.json())
    .then(users=>{

      const userExists = users.find(u => u.username === username)

      if(userExists){
        setError("User already exists")
        return
      }

      fetch("http://localhost:3001/users",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          username,
          password
        })

      }).then(()=>navigate("/login"))

    })

  }

  return(

    <div className="container">

      <div className="formContainer">

        <h2 className="formTitle">Register</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleRegister}>

          <div className="formGroup">

            <label>Username</label>

            <input
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />

          </div>

          <div className="formGroup">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />

          </div>

          <button className="formBtn">
            Register
          </button>

        </form>

        <p style={{marginTop:"15px"}}>

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Register