/* eslint-disable no-useless-escape */
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
    confirmPassword: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 20) {
      newErrors.name = "Name must be at least 20 characters";
    } else if (formData.name.length > 60) {
      newErrors.name = "Name cannot exceed 60 characters";
    }
    
    if (!formData.address) {
      newErrors.address = "Address is required";
    } else if (formData.address.length > 400) {
      newErrors.address = "Address cannot exceed 400 characters";
    }
    
    if (!formData.role) {
      newErrors.role = "Please select a role";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 8 || formData.password.length > 16) {
        newErrors.password = "Password must be between 8-16 characters";
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = newErrors.password || "Password must include at least one uppercase letter";
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
        newErrors.password = newErrors.password || "Password must include at least one special character";
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setServerError("");
    
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
      
      console.log("Registration Successful:", response.data);
      
      navigate("/login", { 
        state: { 
          notification: {
            type: "success",
            message: "Registration successful! Please login with your credentials."
          }
        }
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed!";
      setServerError(errorMessage);
      
      if (errorMessage.toLowerCase().includes("email already exists")) {
        setErrors(prev => ({ ...prev, email: "Email already exists" }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-yellow-600 p-6 text-white">
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
        </div>
        
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name (20-60 characters)"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            <p className="mt-1 text-xs text-gray-500">
              {formData.name ? `${formData.name.length}/60 characters` : "20-60 characters required"}
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.address ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
              }`}
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            <p className="mt-1 text-xs text-gray-500">
              {formData.address ? `${formData.address.length}/400 characters` : "Maximum 400 characters"}
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none bg-white ${
                errors.role ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
              }`}
            >
              <option value="">Select your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="storeOwner">Store Owner</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="8-16 characters with uppercase & special char"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            
            {formData.password && !errors.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  <span className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`h-1 flex-1 rounded-full ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`h-1 flex-1 rounded-full ${formData.password.length <= 16 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 pl-5 list-disc">
                  <li className={formData.password.length >= 8 && formData.password.length <= 16 ? 'text-green-600' : ''}>
                    Between 8-16 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                    At least one uppercase letter
                  </li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : ''}>
                    At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                }`}
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="font-medium text-yellow-600 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;