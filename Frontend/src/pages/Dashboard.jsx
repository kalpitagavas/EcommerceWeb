import React, { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext';
import API from '../api/axios';
import {  useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const {user,logout}=useContext(AuthContext);
    const [products,setProduct]=useState([]);
     const { addToCart,cartItems, deleteFromCart} = useContext(CartContext);
    const nav=useNavigate();
    console.log(user)
 
    useEffect(()=>{
   const fetchProducts=async()=>{
    try{
      const response=await API.get('/product/')
     setProduct(response.data.data);
      console.log(response.data.data)
    }
    catch(err){
        console.log(`Error while fetching Product ${err}`)
    }
   } 
   fetchProducts()
    },[])

    const handleCheckout=async()=>{
        try{
            const orderData = {
                items:cartItems,
                shippingAddress: { address: "123 React St", city: "Mumbai", zipCode: "400001" },
                isPaid: "Unpaid"
        }
        const response=await API.post('/orders',orderData);
        console.log(response.data)
        nav('/myorders');
      alert(`Order Placed Successfully! Order ID: ${response.data.data._id}`);
    }
        catch(err){
            alert(err.response?.data?.message || "Checkout failed");
        }
    }
  return (
    <div>
      <nav>
        <h1>My Store</h1>
        <div>
            <span>Welcome,{user?.name}</span>
            <button onClick={logout}>Logout</button>
        </div>
      </nav>
    <section>
        <h2>Products</h2>
        <div>
            {products.length > 0 ? (products.map((pro)=>(<div key={pro._id}>
                <img src={pro.image} style={{width:"12rem"}}/>
                <h3>{pro.name}</h3>
                <p>{pro.description}</p>
                <p><strong>${pro.price}</strong></p>
                <button onClick={()=>addToCart(pro)}>Add To Cart</button>
                <button onClick={()=>deleteFromCart(pro)}>Delete from Cart</button>
                </div>)) ):(
                    <p>No products found in the database.</p>
                )
            }</div>
    </section>
    <aside>
        <h2>Your Cart {cartItems.length}</h2>
        <p>{cartItems.map((cart)=>(
            <p key={cart.product}>{cart.name} x {cart.quantity} - {cart.price * cart.quantity}</p>
        ))}</p>
        <button disabled={cartItems.length===0} onClick={handleCheckout}>Place Order</button>
    </aside>
    
    </div>
  )
}

export default Dashboard
