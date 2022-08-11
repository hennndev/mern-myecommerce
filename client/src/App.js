import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useData } from './context/appContext'
import { Routes, Route, Outlet } from 'react-router-dom'
import Footer from './components/Customers/Layout/Footer'
import Navbar from './components/Customers/Layout/Navbar'

// CUSTOMERS PAGE
import PageNotFound from './pages/404'
import Home from './pages/Customers/Home'
import Cart from './pages/Customers/Cart'
import Login from './pages/Customers/Login'
import Profile from './pages/Customers/Profile'
import EditProfile from './pages/Customers/EditProfile'
import Register from './pages/Customers/Register'
import OrdersCustomer from './pages/Customers/Orders'
import RequireAuth from './components/Utils/RequireAuth'
import ProductDetail from './pages/Customers/ProductDetail'
import ForgotPassword from './pages/Customers/ForgotPassword'



// ADMIN PAGE
import Users from './pages/Admin/Users'
import Orders from './pages/Admin/Orders'
import Products from './pages/Admin/Products'
import Analytics from './pages/Admin/Analytics'
import Dashboard from './pages/Admin/Dashboard'
import AddProduct from './pages/Admin/AddProduct'
import OrdersUser from './pages/Admin/OrdersUser'
import EditProduct from './pages/Admin/EditProduct'
import OrderHistoryDetail from './pages/Admin/OrderHistoryDetail'
import AdminNavbar from './components/Admin/AdminLayout/AdminNavbar'
import AdminSidebar from './components/Admin/AdminLayout/AdminSidebar'


const App = () => {
    
    const [cookies] = useCookies(['userLogin'])
    const { saveCurrentUser } = useData()
    useEffect(() => {
      if(cookies?.userLogin) {
        const user = jwt_decode(cookies?.userLogin)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${user?.id}`).then(res => res.json()).then(res => {
            const { _id, email, username, profileImage, country, address, telpNumber, postCode, ...userData } = res.data
            saveCurrentUser({
                id: _id,
                username,
                email,
                profileImage,
                country,
                address,
                telpNumber,
                postCode
            })
        })
      }
    }, [cookies?.userLogin])
    

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={
                    <Home/>
                }/>
                <Route path="/products/:productId" element={
                    <ProductDetail/>
                }/>
                <Route path="/login" element={
                    <RequireAuth isAuth>
                        <Login/>
                    </RequireAuth>
                }/>
                <Route path="/register" element={
                    <RequireAuth isAuth>
                        <Register/>
                    </RequireAuth>
                }/>
                <Route path="/forgot-password" element={
                    <RequireAuth isAuth>
                        <ForgotPassword/>
                    </RequireAuth>
                }/>
                <Route path="/orders" element={
                    <RequireAuth>
                        <OrdersCustomer/>
                    </RequireAuth>
                }/>
                <Route path="/profile" element={
                    <RequireAuth>
                        <Profile/>
                    </RequireAuth>
                }/>
                <Route path="/profile/edit-profile" element={
                    <RequireAuth>
                        <EditProfile/>
                    </RequireAuth>
                }/>
                <Route path="/cart" element={
                    <Cart/>
                }/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>


            <Route element={<AdminLayout/>}>
                <Route path="/dashboard" element={
                    <RequireAuth isAdmin>
                        <Dashboard/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/analytics" element={
                    <RequireAuth isAdmin>
                        <Analytics/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/products" element={
                    <RequireAuth isAdmin>
                        <Products/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/products/add-product" element={
                    <RequireAuth isAdmin>
                        <AddProduct/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/products/edit-product" element={
                    <RequireAuth isAdmin>
                        <EditProduct/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/users" element={
                    <RequireAuth isAdmin>
                        <Users/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/users/:userId" element={
                    <RequireAuth isAdmin>
                        <OrdersUser/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/orders-history" element={
                    <RequireAuth isAdmin>
                        <Orders/>
                    </RequireAuth>
                }/>
                <Route path="/dashboard/orders-history/:orderId" element={
                    <RequireAuth isAdmin>
                        <OrderHistoryDetail/>
                    </RequireAuth>
                }/>
            </Route>      
        </Routes>
    )
}


const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}


const AdminLayout = () => {
    return (
        <main className='min-h-screen flex bg-gray-100'>
            <AdminSidebar/>
            <div className='flex flex-1 flex-col w-full'>
                <AdminNavbar/>
                <Outlet/>
            </div>
        </main>
    )
}


export default App