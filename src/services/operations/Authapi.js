// import { endpoints } from "../apis";
// import { apiConnector } from "../operations/apiConnector";
// import { setLoading, setToken,setProducts } from "../../slices/userSlice";
// import { useDispatch } from "react-redux";

// const { SIGNUP_API, LOGIN_API, CREATE_PRODUCT_API } = endpoints;

// export function signup(firstName, lastName, password, email, role, navigate) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", SIGNUP_API, {
//         firstName,
//         lastName,
//         password,
//         email,
//         role,
//       });

//       console.log("SIGNUP API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }
//       navigate("/login");
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error);
//       navigate("/signup");
//     }
//     dispatch(setLoading(false));
//   };
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", LOGIN_API, {
//         email,
//         password,
//       });

//       console.log("LOGIN API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       dispatch(setToken(response.data.token));
//       localStorage.setItem("token", JSON.stringify(response.data.token));

//       navigate("/instructorportal");
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error);
//     }
//     dispatch(setLoading(false));
//   };
// }

import {
  setLoading,
  setToken,
  setProducts,
  setError,
  setUser,
  user
} from "../../slices/userSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../operations/apiConnector";

const {
  SIGNUP_API,
  LOGIN_API,
  CREATE_PRODUCT_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_ALL_PRODUCTS_API,
  EDIT_PRODUCT_API,
  GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
  DELETE_PRODUCT_API,
  BUY_PRODUCT_API,
  GET_ALL_BUY_PRODUCT
} = endpoints;

// Signup Action
export function signup(firstName, lastName, password, email, role, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        password,
        email,
        role,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      dispatch(setError(error.message || "Failed to sign up"));
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Login Action
export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      {user?.role==="Instructor" ? navigate("/products"):navigate("/")}
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      dispatch(setError(error.message || "Failed to login"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const createProduct = async (data, token, navigate) => {
  console.log("data is ", data);
  console.log("Token is ", token);
  //let thum = thumbnail?.path
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    navigate("/products");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
  }
  return result;
};

//create product
// export const createProduct = (
//   name,
//   price,
//   newPrice,
//   category,
//   token,
//   navigate
// ) => {
//   console.log(name, price, newPrice, category, token);
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     console.log("start")
//     try {
//       const response = await apiConnector(
//         "POST",
//         CREATE_PRODUCT_API,
//         {
//           name,
//           price,
//           newPrice,
//           category,
//         },

//         {
//           Authorization: `Bearer ${token}`, // Assuming token should be in headers
//         }
//       );

//       console.log("CREATE PRODUCT API RESPONSE:", response);

//       if (!response?.data?.success) {
//         throw new Error("Could Not Add Product");
//       }

//       const product = response?.data?.data;
//       console.log("Product to dispatch:", product);
//       dispatch(setProducts(product)); // Ensure a single product is stored correctly
//       // Uncomment if navigation is required
//       navigate("/products"); // Navigate to a details page if necessary
//     } catch (error) {
//       console.log("CREATE PRODUCT API ERROR:", error);
//       dispatch(setError(error.message || "Failed to create product"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// };

export const getAllProducts = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCTS_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error);
  }
  return result;
};

export const buyProducts = async (id, token) => {
  let result = null;
  try {
    // Validate the id parameter
    if (!id) {
      throw new Error("Product ID is required.");
    }

    const response = await apiConnector(
      "POST",
      BUY_PRODUCT_API,
      {
        id
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("BUY PRODUCT API RESPONSE......", response);

    if (response?.data?.success) {
      result = response.data.data;
    } else {
      console.log("Couldn't buy product", response?.data?.message || "");
      throw new Error("Purchase failed.");
    }
  } catch (error) {
    console.error("BUY PRODUCT ERROR....", error);
    throw error; // Optionally re-throw the error for further handling
  }

  return result; // Return the result or null if there was an error
};

export const getAllBuyProduct = async () => {
  //console.log(token)
  let result = [];
  try {
    console.log("Before api");
    const response = await apiConnector("GET",  
      GET_ALL_BUY_PRODUCT);

      console.log("after api")

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Buy products");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_BUY_PRODUCT ERROR............", error);
  }
  return result;
};

//

//    //console.log("Buy ", id)
//    let result = [];
//    try{
//     const response = await apiConnector("POST" ,BUY_PRODUCT_API,id);
//     console.log("BUY PRODUCT API RESPONSE...... " , response);
//      if(!response?.data?.success){
//       console.log("Couldn't buy product")
//      }
//      result = response?.data?.data;
//    }catch(error){
//     console.log("BUY PRODUCT ERROR....", error.message);
//    }
// }

// fetching all courses under a specific instructor




export const fetchInstructorCourses = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
  }
  return result;
};

// edit the course details
export const editProductsDetails = async (data, token) => {
  console.log("data is -> ", data);
  let result = null;
  try {
    const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
  }
  return result;
};

// get full details of a course
export const fetchProductsDetails = async (productId, token, dispatch) => {
  console.log("fetch ", productId);
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
      {
        productId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
    dispatch(setProducts(result));
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  //   dispatch(setLoading(false));
  return result;
};

// delete a course
export const deleteProduct = async (data, token) => {
  console.log("Product Id is ", data);
  try {
    const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    console.log(error.message);
  }
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    //dispatch(resetCart())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged Out");
    navigate("/");
  };
}
