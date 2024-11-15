import { Route, Routes } from "react-router-dom"
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx"
import CartPage from "./pages/Cart/CartPage.jsx"
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx"
import ProductPage from "./pages/Product/ProductPage.jsx"
import HomePage from "./pages/Home/HomePage.jsx"
import LoginPage from "./pages/Login/LoginPage.jsx"
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage.jsx"
import RegisterPage from "./pages/Register/RegisterPage.jsx"
import ProfilePage from "./pages/Profile/ProfilePage.jsx"
import OrdersPage from "./pages/Orders/OrdersPage.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx"
import ProductsAdminPage from "./pages/ProductsAdmin/ProductsAdminPage.jsx"
import ProductEditPage from "./pages/ProductEdit/ProductEditPage.jsx"
import UsersPage from "./pages/UsersPage/UsersPage.jsx"
import UserEditPage from "./pages/UserEdit/UserEditPage.jsx"
import MainPage from "./pages/Main/MainPage.jsx"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/search/:searchTerm" element={<HomePage />}></Route>
            <Route path="/tag/:tag" element={<HomePage />}></Route>
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>

            <Route
                path="/checkout"
                element={
                    <AuthRoute>
                        <CheckoutPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/track/:orderId"
                element={
                    <AuthRoute>
                        <OrderTrackPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <AuthRoute>
                        <ProfilePage />
                    </AuthRoute>
                }
            />
            {/* el parámetro 'filter' es opcional */}
            <Route
                path="/orders/:filter?"
                element={
                    <AuthRoute>
                        <OrdersPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <AuthRoute>
                        <Dashboard />
                    </AuthRoute>
                }
            />
            <Route
                path="/admin/products/:searchTerm?"
                element={
                    <AdminRoute>
                        <ProductsAdminPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/addProduct"
                element={
                    <AdminRoute>
                        <ProductEditPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/editProduct/:productId"
                element={
                    <AdminRoute>
                        <ProductEditPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/users/:searchTerm?"
                element={
                    <AdminRoute>
                        <UsersPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/editUser/:userId"
                element={
                    <AdminRoute>
                        <UserEditPage />
                    </AdminRoute>
                }
            />

        </Routes>
    )
}

export default AppRoutes