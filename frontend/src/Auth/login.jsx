import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from '../action';
import { connect } from 'react-redux';

function Login({ setLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true } // Enable cookies for authentication
      );
      alert("Login Successfully");
      console.log("Login Successful:", response.data);
      setLogin(1);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="w-80 border-2 absolute top-40 max-w-md bg-white rounded-lg shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}  
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="p-2">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-black bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Submit
            </button>
          </div>
          <div className="p-2 flex justify-around text-sm">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-amber-700 hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Redux connection
const connectToStore = (state) => ({ commonData: state });
const dispatchToStore = (dispatch) => ({
  setLogin: (value) => dispatch(setLogin(value)),
});

export default connect(connectToStore, dispatchToStore)(Login);
