import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "./pages/Home"
import Detail from "./pages/Detail"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <Detail/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProduct/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct/>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App