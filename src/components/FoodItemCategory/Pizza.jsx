import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/operations/Authapi";
import { setLoading } from "../../slices/userSlice";
import Navbar from "../pages/Navbar";
import { useNavigate } from "react-router-dom";

function Pizza() {
  const { token,loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const result = await getAllProducts();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourses();
  }, [dispatch]);

  const pizzaProduct = products.filter(
    (product) => product.category === "pizza"
  );

  //console.log(pizzaProduct);

  const handleProductClick = (productId) => {
    if (token) {
      navigate(`/productdetails/${productId}`);
    } else {
      navigate("/signup");
    }
  };

  // Return loading message if data is still being fetched
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <h1 className="mt-20 flex justify-center text-xl text-red-600 font-bold">Pizza</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {pizzaProduct.map((pizza) => {
          return (
            <div
              className="overflow-x-hidden shadow-xl flex justify-center capitalize"
              onClick={() => handleProductClick(pizza._id)}
            >
              <div className="flex flex-col">
                <img
                  src={pizza.thumbnail}
                  alt=""
                  className="h-[230px] w-[260px]"
                />
                <div className="flex flex-col justify-center items-center">
                  <p className="font-semibold">{pizza.name}</p>
                  <p>Rs.{pizza.newPrice}</p>
                  <p className="line-through text-red-500">Rs.{pizza.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pizza;
