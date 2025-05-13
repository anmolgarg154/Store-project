import { Route, Routes } from "react-router-dom"
import Home from "./compnents/Home"
import Login from "./Auth/login"
import Register from "./Auth/Register"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
