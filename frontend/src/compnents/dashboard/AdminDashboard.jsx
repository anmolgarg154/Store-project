import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiShoppingBag, 
  FiStar, 
  FiLogOut, 
  FiPlus,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";


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

const UserForm = ({ onSubmit }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user"
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
    // Reset form
    setUserData({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "user"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {userData.role == "storeOwner" ? <div className="text-red-600 p-1 text-sm">Please check that Store-Email and StoreOwner-Email must be same</div> : ""}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="storeOwner">Store Owner</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Add User
      </button>
    </form>
  );
};

const StoreForm = ({ onSubmit }) => {
  const [storeData, setStoreData] = useState({
    name: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(storeData);
    // Reset form
    setStoreData({
      name: "",
      email: "",
      address: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Store</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={storeData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={storeData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={storeData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Store
      </button>
    </form>
  );
};

const DataTable = ({ title, data, columns, itemType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter(item => {
        return Object.keys(item).some(key => {
          if (typeof item[key] === 'string') {
            return item[key].toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      })
    );
  }, [data, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 pl-8 border rounded"
            />
            <FiSearch className="absolute left-2 top-3 text-gray-400" />
          </div>
          <button className="ml-2 p-2 border rounded hover:bg-gray-100">
            <FiFilter />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column, index) => (
                <th key={index} className="py-2 px-4 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b">
                {Object.keys(item).map((key, idx) => {
                  if (key !== 'id' && key !== 'ratings') {
                    return (
                      <td key={idx} className="py-2 px-4">
                        {key === 'role' ? 
                          <span className={`px-2 py-1 rounded text-xs ${
                            item[key] === 'admin' ? 'bg-red-100 text-red-800' : 
                            item[key] === 'storeOwner' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {item[key]}
                          </span> : 
                          item[key]
                        }
                      </td>
                    );
                  }
                  return null;
                })}
                {itemType === 'store' && (
                  <td className="py-2 px-4">
                    {item.ratings ? calculateAverageRating(item.ratings) : 'No ratings'}
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 'No ratings';
  const sum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
  return (sum / ratings.length).toFixed(1) + ' ⭐';
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });
const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all stores
      const storesResponse = await fetch('http://localhost:5000/api/v1/store/all');
      const storesData = await storesResponse.json();
      
      if (storesData.success) {
        setStores(storesData.data);
        
        // Calculate total ratings
        const totalRatings = storesData.data.reduce((total, store) => {
          return total + (store.ratings ? store.ratings.length : 0);
        }, 0);
        

        // Fetch all users
      const userResponse = await fetch('http://localhost:5000/api/v1/auth/all-user');
      const userData = await userResponse.json();

        
        setUsers(userData.data);
        
        // Update stats
        setStats({
          totalUsers: userData.data.length,
          totalStores: storesData.data.length,
          totalRatings: totalRatings
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add the new user to our state
        setUsers([...users, data.data]);
        setStats({...stats, totalUsers: stats.totalUsers + 1});
        setShowAddUserForm(false);
        // Show success message
        alert("User added successfully!");
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user. Please try again.");
    }
  };

  const handleAddStore = async (storeData) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/store/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add the new store to our state
        const newStore = { ...data.data, ratings: [] };
        setStores([...stores, newStore]);
        setStats({...stats, totalStores: stats.totalStores + 1});
        setShowAddStoreForm(false);
        // Show success message
        alert("Store added successfully!");
      } else {
        alert(data.message || "Failed to add store");
      }
    } catch (error) {
      console.error("Error adding store:", error);
      alert("Error adding store. Please try again.");
    }
  };

  const handleLogout = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="h-auto bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white h-screen shadow-md fixed">
          <div className="p-4">
            <h1 className="text-xl font-bold text-yellow-600">Admin Dashboard</h1>
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
                  <FiUsers className="mr-3" /> Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center w-full p-3 ${
                    activeTab === 'users'
                      ? 'bg-yellow-100 text-yellow-600 border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiUsers className="mr-3" /> Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stores')}
                  className={`flex items-center w-full p-3 ${
                    activeTab === 'stores'
                      ? 'bg-yellow-100 text-yellow-600 border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiShoppingBag className="mr-3" /> Stores
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

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DashboardCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={<FiUsers className="text-white" size={20} />}
                  color="bg-yellow-500"
                />
                <DashboardCard
                  title="Total Stores"
                  value={stats.totalStores}
                  icon={<FiShoppingBag className="text-white" size={20} />}
                  color="bg-yellow-500"
                />
                <DashboardCard
                  title="Total Ratings"
                  value={stats.totalRatings}
                  icon={<FiStar className="text-white" size={20} />}
                  color="bg-yellow-500"
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Recent Users</h2>
                <DataTable
                  title="Recent Users"
                  data={users.slice(-3)}
                  columns={["Name", "Email", "Address", "Role"]}
                  itemType="user"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Recent Stores</h2>
                <DataTable
                  title="Recent Stores"
                  data={stores.slice(0, 5)}
                  columns={["Name", "Email", "Address", "Rating"]}
                  itemType="store"
                />
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <button
                  onClick={() => setShowAddUserForm(!showAddUserForm)}
                  className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  <FiPlus className="mr-2" /> Add User
                </button>
              </div>

              {showAddUserForm && (
                <div className="mb-6">
                  <UserForm onSubmit={handleAddUser} />
                </div>
              )}

              <DataTable
                title="All Users"
                data={users}
                columns={["Name", "Email", "Address", "Role"]}
                itemType="user"
              />
            </motion.div>
          )}

          {/* Stores Tab */}
          {activeTab === 'stores' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between h-auto py-4 items-center mb-6">
                <h1 className="text-2xl font-bold">Store Management</h1>
                <button
                  onClick={() => setShowAddStoreForm(!showAddStoreForm)}
                  className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  <FiPlus className="mr-2" /> Add Store
                </button>
              </div>

              {showAddStoreForm && (
                <div className="mb-6">
                  <StoreForm onSubmit={handleAddStore} />
                </div>
              )}

              <DataTable
                title="All Stores"
                data={stores}
                columns={["Name", "Email", "Address", "Rating"]}
                itemType="store"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;