import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setLogin, setProfile } from "../action";

function LoginPage({ setLogin, setProfile }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + `/auth/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                { withCredentials: true } // Enable cookies for authentication
            );

            console.log("Login Successful:", response.data.user);
            setLogin(1)
            setProfile(response.data.user);

            if (response.data.user.role === "storeOwner") {
                navigate("/store-owner-dashboard");
            } else if (response.data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex select-none justify-center items-center h-auto bg-gradient-to-br from-yellow-50 to-indigo-100 p-20">
            <div className="shadow-lg rounded-2xl w-full max-w-md border">
                <div className="bg-yellow-600 p-4 rounded-t-2xl text-white">
                    <h2 className="text-center text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-center textj-gray-600 mb-6">Login to your account</p>
                    {/* <div className="text-center text-gray-600 ">Go to <button onClick={() => { navigate("/admin-dashboard"); }}>Admin Dashboard</button></div>
                    <div className="text-center text-gray-600 ">Go to <button onClick={() => { navigate("/store-owner-dashboard"); }}>Store Owner Dashboard</button></div> */}
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md border-black shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-darkText"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md border-black shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-darkText"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <Link to="/forgotpassword" className="text-bg-amber-400 hover:underline">Forgot password?</Link>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-md font-bold ${loading ? "bg-gray-400" : "bg-amber-400 hover:bg-ring-amber-600"
                            } text-white`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <Link to="/register" className="text-yellow-700 font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

let connectToStore = (state) => ({ commonData: state });
let dispatchToStore = (dispatch) => (
    {
        setLogin: (value) => dispatch(setLogin(value)),
        setProfile: (value) => dispatch(setProfile(value)),

    }
);
export default connect(connectToStore, dispatchToStore)(LoginPage);
