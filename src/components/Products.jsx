// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchInstructorCourses,
//   deleteProduct,
// } from "../services/operations/Authapi";
// import { setLoading, setEditProductId } from "../slices/userSlice";
// import Navbar from "../../src/components/pages/Navbar";
// import Allproducts from "./pages/Allproducts";

// export function Products() {
//   const { token } = useSelector((state) => state.auth); // Assuming token is in auth slice
//   const loading = useSelector((state) => state.auth.loading); // Adjust if loading is in a different slice
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       dispatch(setLoading(true));
//       try {
//         const result = await fetchInstructorCourses(token);
//         if (result) {
//           setCourses(result);
//         }
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchCourses();
//   }, [token, dispatch]);

//   function editHandler(id) {
//     dispatch(setEditProductId(id));
//     navigate(`/dashboard/edit-product/${id}`);
//   }

//   const handleCourseDelete = async (courseId) => {
//     dispatch(setLoading(true));
//     try {
//       await deleteProduct({ productId: courseId }, token);
//       const result = await fetchInstructorCourses(token);
//       if (result) {
//         setCourses(result);
//       }
//     } catch (error) {
//       console.error("Failed to delete course:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className=" min-h-screen">
//     <Navbar/> 
//       <div className="grid grid-cols-1 sm:grid-cols-2 mt-32 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-gradient-to-r
//            from-blue-100 to-blue-200 p-4 rounded-lg shadow-lg border border-red-200 
//             hover:shadow-xl transition-shadow duration-300"
//           >
//             <h2 className="text-xl font-semibold text-red-700 mb-2">
//               {course.name}
//             </h2>
//             <p className="text-red-600 mb-1">
//               <strong>Price:</strong> ${course.price.toFixed(2)}
//             </p>
//             <p className="text-red-600 mb-1">
//               <strong>New Price:</strong> ${course.newPrice.toFixed(2)}
//             </p>
//             <p className="text-red-600 mb-1">
//               <strong>Category:</strong> {course.category}
//             </p>
//             <img src={course.thumbnail} alt="" />
//             <div className="flex justify-end gap-6 p-2">
//               <button
//                 className="border border-red-400 pl-3 pr-3"
//                 onClick={() => editHandler(course._id)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="border border-red-400 pl-3 pr-3"
//                 onClick={() => !loading && handleCourseDelete(course._id)}
//                 disabled={loading}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {user?.role === "Customer" && <Allproducts />}
//     </div>
//   );
// }



// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchInstructorCourses,
//   deleteProduct,
// } from "../services/operations/Authapi";
// import { setLoading, setEditProductId } from "../slices/userSlice";
// import Navbar from "../../src/components/pages/Navbar";
// import Allproducts from "./pages/Allproducts";

// export function Products() {
//   const { token } = useSelector((state) => state.auth); // Assuming token is in auth slice
//   const loading = useSelector((state) => state.auth.loading); // Adjust if loading is in a different slice
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       dispatch(setLoading(true));
//       try {
//         const result = await fetchInstructorCourses(token);
//         if (result) {
//           setCourses(result);
//         }
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchCourses();
//   }, [token, dispatch]);

//   function editHandler(id) {
//     dispatch(setEditProductId(id));
//     navigate(`/dashboard/edit-product/${id}`);
//   }

//   const handleCourseDelete = async (courseId) => {
//     dispatch(setLoading(true));
//     try {
//       await deleteProduct({ productId: courseId }, token);
//       const result = await fetchInstructorCourses(token);
//       if (result) {
//         setCourses(result);
//       }
//     } catch (error) {
//       console.error("Failed to delete course:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 relative">
//       <Navbar />
//       <div className=" container mx-auto p-6 mt-20">
//         <h1 className="relative text-3xl font-bold text-center text-red-600 mb-8 mt-20">
//           Your Products
//         </h1>
//         <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
//          lg:grid-cols-4 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-gradient-to-r from-white100 to-white-200 p-6 rounded-lg shadow-lg border border-red-200 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
//             >
//               <h2 className="text-xl font-semibold text-red-700 mb-2">
//                 {course.name}
//               </h2>
//               <p className="text-red-600 mb-1">
//                 <strong>Price:</strong> ${course.price.toFixed(2)}
//               </p>
//               <p className="text-red-600 mb-1">
//                 <strong>New Price:</strong> ${course.newPrice.toFixed(2)}
//               </p>
//               <p className="text-red-600 mb-2">
//                 <strong>Category:</strong> {course.category}
//               </p>
//               <img
//                 src={course.thumbnail}
//                 alt={course.name}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <div className="flex justify-between items-center gap-6 mt-4">
//                 <button
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//                   onClick={() => editHandler(course._id)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//                   onClick={() => !loading && handleCourseDelete(course._id)}
//                   disabled={loading}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {user?.role === "Customer" && <Allproducts />}
//       </div>
//     </div>
//   );
// }



import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchInstructorCourses,
  deleteProduct,
} from "../services/operations/Authapi";
import { setLoading, setEditProductId } from "../slices/userSlice";
import Navbar from "../../src/components/pages/Navbar";
import Allproducts from "./pages/Allproducts";

export function Products() {
  const { token } = useSelector((state) => state.auth); // Assuming token is in auth slice
  const loading = useSelector((state) => state.auth.loading); // Adjust if loading is in a different slice
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const result = await fetchInstructorCourses(token);
        if (result) {
          setCourses(result);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourses();
  }, [token, dispatch]);

  function editHandler(id) {
    dispatch(setEditProductId(id));
    navigate(`/dashboard/edit-product/${id}`);
  }

  const handleCourseDelete = async (courseId) => {
    dispatch(setLoading(true));
    try {
      await deleteProduct({ productId: courseId }, token);
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        {/* <h1 className="relative text-3xl font-bold text-center text-red-600 mb-8 mt-20">
          Your Products
        </h1> */}
        {/* Scrollable container for products */}
        <div className="overflow-y-auto h-[calc(100vh-200px)] mb-8 mt-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gradient-to-r from-white100 to-white-200 p-6 rounded-lg shadow-lg border border-red-200 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  {course.name}
                </h2>
                <p className="text-red-600 mb-1">
                  <strong>Price:</strong> ${course.price.toFixed(2)}
                </p>
                <p className="text-red-600 mb-1">
                  <strong>New Price:</strong> ${course.newPrice.toFixed(2)}
                </p>
                <p className="text-red-600 mb-2">
                  <strong>Category:</strong> {course.category}
                </p>
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="flex justify-between items-center gap-6 mt-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => editHandler(course._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => !loading && handleCourseDelete(course._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional content */}
        {user?.role === "Customer" && <Allproducts />}
      </div>
    </div>
  );
}
