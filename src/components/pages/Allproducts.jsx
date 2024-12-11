import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fine from "../../images/fine.jpg";
import { setLoading, setFormDetails } from "../../slices/userSlice";
import { getAllProducts } from "../../services/operations/Authapi";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

function Allproducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { formDetails } = useSelector((state) => state.auth);

  const userRole = user?.role || localStorage.getItem("userRole"); // Fallback to localStorage
  const storedToken = token || localStorage.getItem("token"); // Fallback to localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingState(true);
      try {
        const result = await getAllProducts();
        if (result && Array.isArray(result)) {
          dispatch(setFormDetails(result));
          setAllProducts(result);
        } else {
          throw new Error("Invalid product data received");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch products");
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingState(false);
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleProductClick = (productId) => {
    if (storedToken) {
      navigate(`/productdetails/${productId}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        {/* Background Image with Navbar overlay */}
        <img
          src={fine}
          alt="Background"
          className="h-[280px] sm:h-[560px] sm:w-full p-4 overflow-x-hidden object-cover"
        />
        <Navbar />
      </div>

      <div className="mb-12 flex items-center justify-between p-4">
        <h1 className="text-4xl font-semibold text-red-800">
          {userRole === "Instructor" ? "Instructor Portal" : "All Food Items"}
        </h1>

        {userRole === "Instructor" && (
          <Link to="/instructorportal">
            <h3 className="p-3 mt-3 rounded-xl cursor-pointer bg-red-500 text-white font-bold">
              Add Product
            </h3>
          </Link>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ml-10 md:12 sm:26">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product._id}>
              <div
                className="flex flex-col justify-center items-center shadow-xl capitalize h-[300px] w-[260px] cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-[230px] w-[260px]"
                />
                <h2 className="font-bold">{product.name}</h2>
                <div className="flex gap-6">
                  <p>Rs.{product.newPrice}</p>
                  <p className="text-red-500 line-through">
                    Rs.{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Allproducts;
