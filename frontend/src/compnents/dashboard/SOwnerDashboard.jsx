/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiStar, 
  FiLogOut, 
  FiLock,
  FiShoppingBag,
  FiUser
} from "react-icons/fi";
import { connect } from "react-redux";
import { useDataContext } from '../../context/DataContext';
import { useNavigate } from "react-router-dom";

// Components
const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-md"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const PasswordChangeForm = ({ onSubmit }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    onSubmit(passwordData);
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Update Password
      </button>
    </form>
  );
};

const RatingUsersList = ({ ratings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Rating Users</h2>
      
      {ratings.length === 0 ? (
        <p className="text-gray-500">No ratings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">UserId</th>
                <th className="py-2 px-4 text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <FiUser className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">{rating.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-bold mr-1">{rating.rate}</span>
                      <FiStar className="text-yellow-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RatingDistributionChart = ({ ratings }) => {
  // Calculate rating distribution
  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  ratings.forEach(rating => {
    distribution[rating.rate] += 1;
  });
  
  const maxCount = Math.max(...Object.values(distribution));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Rating Distribution</h2>
      
      <div className="space-y-4">
        {[5, 4, 3, 2, 1].map(rate => (
          <div key={rate} className="flex items-center">
            <div className="flex items-center w-16">
              <span className="font-bold mr-1">{rate}</span>
              <FiStar className="text-yellow-500" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 ml-2">
              <div 
                className="bg-yellow-500 h-4 rounded-full"
                style={{ 
                  width: `${maxCount > 0 ? (distribution[rate] / maxCount) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <span className="ml-3 w-8 text-gray-600">{distribution[rate]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Page
function StoreOwnerDashboard({ commonData }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store } = useDataContext();
  let arr = store.store
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    commonData.profile || 
    { id: 1, name: "Store Owner", email: commonData.email }
  );

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    setIsLoading(true);
    try {
        const matchingStores = arr.filter(e => e.email === commonData.profile.email);
        let data = matchingStores[0]
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const store = {
        id: data.id,
        name: data.name,
        email: data.email,
        address: data.address,
        ratings: data.ratings
      };
      console.log(store.ratings)
      
      setStoreData(store);
    } catch (err) {
      console.error("Error fetching store data:", err);
      setError("Failed to load store data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const calculateAverageRating = () => {
    if (!storeData || !storeData.ratings || storeData.ratings.length === 0) {
      return 0;
    }
    
    const sum = storeData.ratings.reduce((acc, rating) => acc + rating.rate, 0);
    return (sum / storeData.ratings.length).toFixed(1);
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      // POST /api/v1/auth/change-password
      
      const password = passwordData
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message
      alert("Password updated successfully!",password);
      setShowPasswordForm(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleLogout = () => {
        navigate("/login");
    window.location.reload();

  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-3 text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={fetchStoreData}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Try Again
          </button>
          <div className="p-2 bg-amber-500 mt-2 rounded-2xl hover:bg-amber-600"><button onClick={()=>{navigate("/login");}}>Login</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto p-2 bg-gray-100">
      <div className="flex">
        <div className="w-64 bg-white h-screen shadow-md fixed">
          <div className="p-4">
            <h1 className="text-xl font-bold text-yellow-600">Store Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">{storeData?.name}</p>
          </div>
          
          <div className="p-4 border-t border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full">
                <FiShoppingBag className="text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-6">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center w-full p-3 ${
                    activeTab === 'dashboard'
                      ? 'bg-yellow-100 text-yellow-600 border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiStar className="mr-3" /> Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('account');
                    setShowPasswordForm(false);
                  }}
                  className={`flex items-center w-full p-3 ${
                    activeTab === 'account'
                      ? 'bg-yellow-100 text-yellow-600 border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiUser className="mr-3" /> My Account
                </button>
              </li>
              <li className="mt-auto">
                <button
                  onClick={()=>navigate('/')}
                  className="flex items-center w-full p-3 text-yellow-600 hover:bg-yellow-50"
                >
                  <FiStar className="mr-3" /> Website
                </button>
              </li>
              <li className="mt-auto">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 text-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="mr-3" /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="ml-64 py-4 flex-1 p-6">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DashboardCard
                  title="Store Name"
                  value={`${storeData.name}`}
                  icon={<FiStar className="text-white" size={20} />}
                  color="bg-yellow-500"
                />
                <DashboardCard
                  title="Average Rating"
                  value={`${calculateAverageRating()} ⭐`}
                  icon={<FiStar className="text-white" size={20} />}
                  color="bg-yellow-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-6">
                <RatingUsersList ratings={storeData?.ratings || []} />
                <RatingDistributionChart ratings={storeData?.ratings || []} />
              </div>
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Store Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Store Name</p>
                    <p className="font-medium">{storeData?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Store Email</p>
                    <p className="font-medium">{storeData?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Store Address</p>
                    <p className="font-medium">{storeData?.address}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">StoreOwner Name</p>
                    <p className="font-medium">{commonData?.profile.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">StoreOwner Email</p>
                    <p className="font-medium">{commonData?.profile.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">StoreOwner Address</p>
                    <p className="font-medium">{commonData?.profile.address}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="flex items-center text-yellow-600 hover:text-yellow-800"
                  >
                    <FiLock className="mr-2" /> 
                    {showPasswordForm ? "Cancel" : "Change Password"}
                  </button>
                </div>
              </div>
              
              {showPasswordForm && (
                <PasswordChangeForm onSubmit={handlePasswordChange} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const connectToStore = (state) => ({ commonData: state });

export default connect(connectToStore)(StoreOwnerDashboard);