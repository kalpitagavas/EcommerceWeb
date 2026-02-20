import React, { useContext, useState,useEffect } from 'react'
import API from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const{user}=useContext(AuthContext)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('');

    useEffect(() => {
        const getUserData = async () => {
              if (!user || !user.userId) return;
            try {
                // Get fresh data from backend
                const res = await API.get(`/users/${user.userId}`);
                setName(res.data.data.name);
                setEmail(res.data.data.email);
            } catch (err) {
                console.log(err);
            }
        };
        getUserData();
    }, [user?.userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/users/${user.userId}`, { name, email });
            alert("Profile Updated!");
        } catch (err) {
            alert("Update failed",err);
        }
    };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
      <button type="submit">Update My Profile</button>
</form>
    </div>
  )
}

export default Profile
