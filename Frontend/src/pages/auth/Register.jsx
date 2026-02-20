import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from Navigate
import API from '../../api/axios';

const Register = () => {
    // Individual states as you requested
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // State for the select dropdown
    
    const nav = useNavigate(); // Hook must be used like this

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending the individual states as an object to the backend
            const response = await API.post('/users/register', { 
                name, 
                email, 
                password, 
                role 
            });
           console.log(response.data)
            if (response.data.success) {
                alert("Registration Successful!");
                nav('/login');
            }
        } catch (err) {
            // Show the specific error message from your Backend (like "Email already exists")
            alert(err.response?.data?.message || "Registration failed");
            console.log(err);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}> {/* Use onSubmit on the form, not onClick on the button */}
                <input 
                    type="text" 
                    placeholder='Enter your Name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder='Enter your Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder='Enter your Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? 
                <span onClick={() => nav('/login')} style={{cursor: 'pointer', color: 'blue'}}> Login here</span>
            </p>
        </div>
    )
}

export default Register;