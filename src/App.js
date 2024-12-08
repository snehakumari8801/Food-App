import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/pages/Home";
import Login from "../src/components/pages/Login";
import Instructorportal from "./components/Instructorportal";
import { Products } from "../src/components/Products";
import EditProduct from "./components/EditProduct";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Frontpage from "./components/pages/Frontpage";
import Allproducts from "./components/pages/Allproducts";
import Cart from "./components/pages/Cart";
import ProductsDetails from "./components/pages/ProductsDetails";
import Sweets from "./components/FoodItemCategory/Sweets";
import Pizza from "./components/FoodItemCategory/Pizza";
import Noodles from "./components/FoodItemCategory/Noodles";
import NorthIndian from "./components/FoodItemCategory/NorthIndian";
import SouthIndian from "./components/FoodItemCategory/SouthIndian";
import Error from "./components/pages/Error";

function App() {
  const { user } = useSelector((state) => state.auth);
  console.log("user is ", user?.role);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Allproducts />} />
        <Route path="/signup" element={<Home />}>
          {" "}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />

        {user?.role === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="/instructorportal" element={<Instructorportal />} />
            <Route
              path="/dashboard/edit-product/:productId"
              element={<EditProduct />}
            />
            <Route path="*" element={<Error />} />
          </>
        )}

        {user?.role === ACCOUNT_TYPE.CUSTOMER && (
          <>
            <Route path="/allproducts" element={<Allproducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails/:id" element={<ProductsDetails />} />
            <Route path="/sweets" element={<Sweets />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/noodles" element={<Noodles />} />
            <Route path="/northindian" element={<NorthIndian />} />
            <Route path="/southindian" element={<SouthIndian />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
