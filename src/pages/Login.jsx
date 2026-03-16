import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login(){

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const handleLogin=(e)=>{

    e.preventDefault()

    fetch("http://localhost:3001/users")
    .then(res=>res.json())
    .then(users=>{

      const user = users.find(
        u => u.username === username && u.password === password
      )

      if(user){

        localStorage.setItem("auth","true")

        navigate("/")

      }else{

        setError("Invalid login or password")

      }

    })

  }

  return(

    <div className="container">

      <div className="formContainer">

        <h2 className="formTitle">Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <p style={{marginTop:"15px"}}>

          No account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login