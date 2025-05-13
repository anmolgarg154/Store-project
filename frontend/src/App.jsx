import { Route, Routes } from "react-router-dom"
import Home from "./compnents/Home"
import Login from "./Auth/login"
import Register from "./Auth/Register"
import Navbar from "./compnents/Navbar"
import Profile from "./compnents/Profile"

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profilePage" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
