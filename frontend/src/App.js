import './App.css';
import React from 'react';
import Footer from './customer/components/Footer/Footer.jsx';
import Navigation from './customer/components/Navigation/Navigation.jsx';
import Product from './customer/components/Product/Product.jsx';
import HomePage from './customer/pages/HomePage/HomePage.jsx';
import ProductDetails from './customer/components/ProductDetails/ProductDetails.jsx';
import Cart from './customer/components/Cart/Cart.jsx';
import Checkout from './customer/components/Checkout/Checkout.jsx';
import Order from './customer/components/Order/Order.jsx';
import OrderDetails from './customer/components/Order/OrderDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './Routes/CustomerRouters.jsx';
import AdminRouters from './Routes/AdminRouters.jsx';

function App() {
  return (
    <div className="">
    <Routes>
      <Route path='/*' element={<CustomerRouters/>}></Route>
      <Route path='/admin/*' element={<AdminRouters/>}></Route>
    </Routes>
     
    </div>
  );
}

export default App;
