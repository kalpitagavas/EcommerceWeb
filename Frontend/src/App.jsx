import './App.css'
import Login from './pages/auth/Login'
import ProtectedRoute from './component/ProtectedRoute'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/auth/Register'
import MyOrders from './pages/users/MyOrder'
import UserList from './pages/admin/UserList'
import Profile from './pages/users/Profile'
import AdminProduct from './pages/admin/AdminProduct'
import ProductGallery from './pages/users/ProductGallery'
function App() {
 const user = JSON.parse(localStorage.getItem('userInfo'));
  return (
 
    <Routes>
      <Route path='/login'element={<Login/>}/>
      <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
              <MyOrders/>
          
            </ProtectedRoute>
          } 
        />
      <Route path='/'element={<Login/>}/><Route path='/register'element={<Register/>}/>
  <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <UserList /> : <h2>Access Denied</h2>}
          </ProtectedRoute>
        } 
      />
      <Route path="/admin/addProduct" element={<AdminProduct/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/product'element={<ProductGallery/>}/>
      </Routes>
  
  )
}

export default App
