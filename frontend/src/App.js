import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductAnalysisScreen from "./screens/ProductAnalysisScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        minH="xl"
        py="6"
        px="6"
        bgColor="gray.300"
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen/>}/>
          <Route path="/cart/:id" element={<CartScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/shipping" element={<ShippingScreen/>}/>
          <Route path="/payment" element={<PaymentScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/admin/userlist" element={<UserListScreen/>}/>
          <Route path="admin/user/:id/edit" element={<UserEditScreen/>}/>
          <Route path="/admin/productlist" element={<ProductListScreen/>}/>
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
          <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
          <Route path="/admin/productanalysis" element={<ProductAnalysisScreen/>}/>
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
