import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import NoPage from './pages/noPage/NoPage'
import ProductInfo from './pages/productInfo/ProductInfo'
import ScrollTop from './components/scrollTop/ScrollTop'
import CartPage from './pages/cart/CartPage'
import Signup from './pages/registration/Signup'
import Login from './pages/registration/Login'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProductPage from './pages/admin/AddProductPage'
import UpdateProductPage from './pages/admin/UpdateProductPage'
import MyState from './context/MyState'
import { Toaster } from 'react-hot-toast'
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin'
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser'

const App = () => {
  return (
    <MyState> 
      <BrowserRouter>
      <ScrollTop/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/*" element={<NoPage/>} />
          <Route path="/productinfo" element={<ProductInfo/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/addproduct" element={<AddProductPage/>} />
          <Route path="/updateproduct" element={<UpdateProductPage/>} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />  {/* category Page route  */}
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </MyState>
  )
}

export default App