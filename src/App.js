import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './features/common/Header';
import Home from './pages/HomePage';
import SignIn from './features/auth/components/SignIn';
import Footer from './features/common/Footer';
import ProductDetails from './features/product/components/ProductDetails'
// import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/UserContext';
import ProductList from './features/product/components/ProductList';
import SignUp from './features/auth/components/SignUp';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ContactUsPage from './pages/ContactUsPage';
import CartPage from './pages/CartPage';
import CategoryProductListPage from './pages/CategoryProductListPage'; // Import CategoryProductListPage
import UserOrderPage from './pages/UserOrderPage';
import AddProductPage from './pages/AddProductPage';
import SearchedProductPage from './pages/SearchedProductPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/fpwd" element={<ForgotPasswordPage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/orders" element={<UserOrderPage/>} />
            <Route path="/category/:category" element={<CategoryProductListPage />} />
            <Route path="/addproduct" element={<AddProductPage/>} />
            <Route path="/searchedproducts/:category/:title" element={<SearchedProductPage />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPasswordPage/>} />
          
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
