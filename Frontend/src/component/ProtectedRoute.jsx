import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const{user,loading}=useContext(AuthContext)
// 1. If we are still checking localStorage, show nothing or a spinner
    if (loading) {
        return <div>Loading...</div>; 
    }
    if(!user){
        return(<Navigate to='/login'replace/>)
    }
    return children
}

export default ProtectedRoute
