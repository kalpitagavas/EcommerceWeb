import React, { useContext, useState } from 'react';
import API from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const{setUser}=useContext(AuthContext);
const nav=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // 1. IMPORTANT: Stops the page from refreshing

    // 2. Create the data object from your state
    const userCredentials = {
        email: email,
        password: password
    };

    console.log("Data being sent to backend:", userCredentials);

    try {
      // 3. Send the object 'userCredentials' as the body
      const response = await API.post('/users/login', userCredentials);
      const token=response.data.token
      if(token){
   
       localStorage.setItem('userInfo', JSON.stringify(response.data))
       //Now every component in your app knows who the user is
        setUser(response.data)
        console.log("Login Success! Token stored.");
      // 3. Move the user away from the login page
        nav('/dashboard')
      }

      console.log("Success:", response.data);
    } catch (err) {
      // Log specific error message from backend if available
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email} // Controlled component
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password} // Controlled component
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;