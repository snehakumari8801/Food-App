import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/operations/Authapi";
import { setLoading } from "../../slices/userSlice";
import Navbar from "../pages/Navbar";
import { useNavigate } from "react-router-dom";

function Sweets() {
  const { token ,loading} = useSelector((state) => state.auth);
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

  const sweetProduct = products.filter(
    (product) => product.category === "sweets"
  );

  console.log(sweetProduct);

  const handleProductClick = (productId) => {
    if (token) {
      navigate(`/productdetails/${productId}`);
    } else {
      navigate("/signup");
    }
  };

  // Return loading message if data is still being fetched
  if (loading) {
    return <div className="flex justify-center items-center text-lg">Loading....</div>;
  }

  return (
    <div className="overflow-x-hidden m-3">
      <Navbar />
      <h1 className="mt-20  flex justify-center text-xl text-red-600 font-bold">Sweets</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-10 capitalize">
        {sweetProduct.map((sweet) => {
          return (
            <div
              className="overflow-x-hidden shadow-xl flex justify-center items-center"
              onClick={() => handleProductClick(sweet._id)}
            >
              <div className="flex flex-col ">
                <img
                  src={sweet.thumbnail}
                  alt=""
                  className="h-[230px] w-[260px]"
                />

                <div className="flex flex-col justify-center items-center">
                  <p className="font-semibold">{sweet.name}</p>
                  <p>Rs.{sweet.newPrice}</p>
                  <p className="line-through text-red-500">Rs.{sweet.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sweets;
