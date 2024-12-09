

// import React from "react";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import fine from '../../images/fine.jpg'
// import {
//   setLoading,
//   setProducts,
//   setFormDetails,
// } from "../../slices/userSlice";
// import {
//   fetchInstructorCourses,
//   getAllProducts,
// } from "../../services/operations/Authapi";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "./Navbar";

// function Allproducts() {
//   const [allProducts, setAllProducts] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // useNavigate hook for programmatic navigation
//   const { token, user } = useSelector((state) => state.auth);
//   const { formDetails } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       dispatch(setLoading(true));
//       try {
//         const result = await getAllProducts();
//         if (result) {
//           dispatch(setFormDetails(result));
//           setAllProducts(result);
//         }
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchCourses();
//   }, [dispatch]);

//   const handleProductClick = (productId) => {
//     if (token) {
//       navigate(`/productdetails/${productId}`); // navigate to product details
//     } else {
//       navigate("/signup"); // navigate to login if not authenticated
//     }
//   };

//   return (
//     <div className="overflow-x-hidden">
//       <Navbar />
//       <div className="w-full relative">
//       <img
//       src={fine} 
//         alt=""
//         className="h-[280px] sm:h-[560px] sm:w-[80vw] p-4 overflow-x-hidden -translate-y-10 "
//       />
//       </div>
//       <div className="mb-12 flex items-center justify-between p-4 ">
//         {user?.role != "Customer" ? (
//           <h1 className="text-4xl font-semibold text-red-800">My Products</h1>
//         ) : (
//           <h1 className="text-4xl font-semibold text-red-800">All Products</h1>
//         )}

//         <Link to="/instructorportal">
//           <h3 className="p-3 mt-3 rounded-xl cursor-pointer bg-red-500 text-white font-bold">
//             Add Product
//           </h3>
//         </Link>
//       </div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 
//        ml-10 md:12 sm:26">
//         {formDetails.length > 0 ? (
//           allProducts.map((product) => (
//             <div key={product._id}>
//               <div
//                 className="flex flex-col justify-center items-center
//                 shadow-xl h-[300px] w-[260px] cursor-pointer"
//                 onClick={() => handleProductClick(product._id)} // handle click event
//               >
//                 <img
//                   src={product.thumbnail}
//                   alt={product.name}
//                   className="h-[230px] w-[260px]"
//                 />
//                 <h2 className="font-bold">{product.name}</h2>
//                 <div className="flex gap-6">
//                   <p>Rs.{product.newPrice}</p>
//                   <p className="text-red-500 line-through">
//                     Rs.{product.price}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Allproducts;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fine from "../../images/fine.jpg";
import { setLoading, setFormDetails } from "../../slices/userSlice";
import { getAllProducts } from "../../services/operations/Authapi";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

function Allproducts() {
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const { token, user } = useSelector((state) => state.auth);
  const { formDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const result = await getAllProducts();
        if (result) {
          dispatch(setFormDetails(result));
          setAllProducts(result);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleProductClick = (productId) => {
    if (token) {
      navigate(`/productdetails/${productId}`); // navigate to product details
    } else {
      navigate("/signup"); // navigate to login if not authenticated
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
        <Navbar /> {/* Positioning of Navbar */}
      </div>

      <div className="mb-12 flex items-center justify-between p-4">
        {/* {user?.role !== "Customer" ? (
          <h1 className="text-4xl font-semibold text-red-800">My Products</h1>
        ) : (
          <h1 className="text-4xl font-semibold text-red-800 ">All Food Items</h1>
        )} */}
        <h1 className="text-4xl font-semibold text-red-800">All Food Items</h1>

        {user?.role === "Instructor" &&
        <Link to="/instructorportal">
          <h3 className="p-3 mt-3 rounded-xl cursor-pointer bg-red-500 text-white font-bold">
            Add Product
          </h3>
        </Link>
        }
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ml-10 md:12 sm:26">
        {formDetails.length > 0 ? (
          allProducts.map((product) => (
            <div key={product._id}>
              <div
                className="flex flex-col justify-center items-center shadow-xl h-[300px] w-[260px] cursor-pointer"
                onClick={() => handleProductClick(product._id)} // handle click event
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-[230px] w-[260px]"
                />
                <h2 className="font-bold">{product.name}</h2>
                <div className="flex gap-6">
                  <p>Rs.{product.newPrice}</p>
                  <p className="text-red-500 line-through">Rs.{product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default Allproducts;

