import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from  'react';

  import ProtectedRoute from './ProtectedRoute';
  import Dashboard from './Dashboard';
  import Login from './Login';
 import Register from "./Register";
import "./App.css";
function App() {

  const [isLoggedIn, setIsLoggedIn]= useState(localStorage.getItem("isLoggedIn") || false
);
  const [showSignup, setShowSignup] = useState(false);
  const [, setOrders] = useState([]);
  
   //fetch Orders
  const fetchOrders = async () => {
    
    const response = await
    fetch('https://mern-ecommerce-dashboard-1.onrender.com/orders');
    const data = await response.json();
      
      setOrders(data);
    };
  useEffect(() => {
    fetchOrders();
    }, []);
    return (
  
  <Routes>
    <Route path="/login" element = {
      <Login
      setIsLoggedIn={setIsLoggedIn}
      />
    }
    />
<Route
    path="/Dashboard"
    element= {
      <ProtectedRoute>
                <Dashboard
        setIsLoggedIn= {setIsLoggedIn}
        />
        </ProtectedRoute>
    }
    />
    
    <Route
    path="/register"
    element={<Register />}
    />
    <Route 
    path="*"
     element={<Navigate to="/login" />}
    />
  </Routes>
  );

  <div>
    {
      isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        showSignup ? (
          <div>

          <Register />
          <p style={{ textAlign: "center" }}>
            Already have an account?

            <button onClick={() =>
            setShowSignup(false)}>Login</button>     </p> 
            </div>
        ) : ( 
          <div>

          <Login setIsLoggedIn={setIsLoggedIn} />
          <p style={{textAlign: "center" }}>
            Don't have an account?
            <button onClick={() => setShowSignup(true)}>
              Register
            </button>
          </p>
          </div>
        )
        )
      
    }
  </div>
  
 }
export default App;