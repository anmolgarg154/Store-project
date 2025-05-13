import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          role: formData.role,
        }
      );
      alert("Register successfully");
      console.log("Registration Successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-80 border-2 max-w-md bg-white rounded-lg shadow-md mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="p-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="Admin">Admin</option>
              <option value="Store Owner">Store Owner</option>
            </select>
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
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
