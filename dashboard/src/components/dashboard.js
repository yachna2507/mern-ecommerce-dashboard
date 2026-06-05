import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard({setIsLoggedIn }) {
 const [orders, setOrders] = useState([]);
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [customerName, setCustomerName] = useState("");
 const [product_name, setProductName] = useState("");
const [price, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [search, setSearch] = useState("");
const [editId, setEditId] = useState(null);
const navigate = useNavigate();
const token = localStorage.getItem("token");
if (token) {
    const decoded = jwtDecode(token);

    const currentTime=
    Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
    }
  };

       //-- fetch order
const fetchOrders = async () => {
const response = await axios.get("/orders");
console.log(response.data);
        setOrders(response.data.orders || []);
        
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    //-- Add order

    const addOrder = async () => {
        if (!product_name || !price || !quantity)
        {
          alert("Please fill all fields");
        
        return;
      }

      const orderData = {
        customerName,
        product_name,
        price,
        quantity
      };
    try {
      await 
       
      axios.post(`https://mern-ecommerce-dashboard-1.onrender.com/orders`, orderData);
      fetchOrders();
      toast.success("Order Added Successfully");
      setCustomerName();
      setProductName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      toast.error("Failed to add order");
    }
    
    };
    //Delete Order

const deleteOrder = async (id) => {
const confirmDelete = window.confirm("Are you sure you want to delete?");
if (!confirmDelete) {
  return;

}
  await
    axios.delete (`https://mern-ecommerce-dashboard-1.onrender.com/orders/${id}`);

  fetchOrders();
  toast.error("Order Deleted");
};

//-- Edit order

const editOrder = (order) => {
  setEditId(order._id);
  setCustomerName(order.customerName);
  setProductName(order.product_name);
  setPrice(order.price);
  setQuantity(order.quantity);
  
};
//--Update order
const orderData = {
    customerName,
    product_name,
    price,
    quantity
  };
const updateOrder = async (id) => {
  
   if (!customerName || !product_name || !price || !quantity)
    {
      toast.error("Please fill all fields");
     return;
  }
  if (price <=0 || quantity <= 0) {
    toast.error("Price and Quantity must be greater than 0");
    return;
    }
  
  try {

  await 
  
axios.put(`https://mern-ecommerce-dashboard-1.onrender.com/orders/${editId}`, orderData);
  fetchOrders();
  toast.success("Order Updated");
  } catch (error) {
  toast.error("Failed to update order");
}
  setEditId(null);
  setCustomerName("");
  setProductName("");
  setPrice("");
  setQuantity("");

  
};





    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    };



useEffect(() => {
axios.get(`https://mern-ecommerce-dashboard-1.onrender.com/orders?page=${page}&limit=5`)
.then((res) => {

  setOrders(res.data.orders || []);
  setTotalPages(res.data.totalPages || 0);
});
}, [page]);


const filteredOrders =
orders.filter((order) =>
  order.customerName
?.toLowerCase()
.includes(search.toLowerCase())
) ;  

    return (
      <>
      <ToastContainer />
        <div className="container">
            <h1>Orders Dashboard</h1>

            <button onClick={handleLogout}>Logout</button>
<br /> <br />

<input type="text" placeholder="Customer Name" value={customerName} 
onChange={(e) => setCustomerName(e.target.value)}
/>
<input type="text" placeholder="Product Name" value={product_name}
      onChange={(e) => setProductName(e.target.value)}
    /> 
    
<input type="number" placeholder="price" value={price}
      onChange={(e) => setPrice(e.target.value)}
    /> 

    
<input type="number" placeholder="Quantity" value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    /> 

   {
        editId ? (
            <button onClick={updateOrder}>Update Order</button>
        ) : (
<button onClick={addOrder}>Add Order</button>
        )
      }
      <br />
      <br />

<input type="text" placeholder="Search Customer" value={search}
 onChange={(e) => setSearch(e.target.value)}
    />
    <br />
    <br />
    <table style={{width: "100%", borderCollapse: "collapse", border: "1px solid black"}}>
      <thead>
        <tr>
          <th style={{border: "1px solid black", padding: "10px"}}>Customer Name</th>
          <th style={{border: "1px solid black", padding: "10px"}}>Product Name</th>
          <th style={{border: "1px solid black", padding: "10px"}}>Price</th>
          <th style={{border: "1px solid black", padding: "10px"}}>Quantity</th>
          <th style={{border: "1px solid black", padding: "10px"}}>Actions</th>
          </tr>
          </thead>
          <tbody>
 {filteredOrders.map((order) => (
  <tr key={order._id}>
    <td style={{border: "1px solid black", padding: "10px"}}>{order.customerName}</td>
    <td style={{border: "1px solid black", padding: "10px"}}>{order.product_name}</td>
    <td style={{border: "1px solid black", padding: "10px"}}>{order.price}</td>
    <td style={{border: "1px solid black", padding: "10px"}}>{order.quantity}</td>
<td style={{border: "1px solid black", padding: "10px"}}>
  <button onClick={() => editOrder(order)} style={{marginRight: "5px"}}>Edit</button>
  <button onClick={() => deleteOrder(order._id)} >Delete</button>
  </td>
  </tr>
 ))}
 </tbody>
 </table>
<div style={{ marginTop: "20px" }}>
  <button disabled= 
  {page === 1} onClick={() => setPage(page-1)} >
    prev
  </button>
  <span style={{
    margin: "0 10px"
  }} >
    Page {page} of {totalPages}
  </span>
  <button disabled={page === totalPages} 
  onClick={() => setPage(page + 1)}>Next</button>
</div>


 </div>
 </>
 );
 };
 export default Dashboard;    
     

    
