import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../slices/userSlice";
import Upload from "../components/Upload";
import {
  editProductsDetails,
  createProduct,
  fetchInstructorCourses,
} from "../services/operations/Authapi";
import { useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { Link } from "react-router-dom";


function Instructorportal() {
  const { editProduct } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.auth);
const { token, editProductId } = useSelector((state) => state.auth);

  console.log("Products is ",typeof products ,products , editProductId);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        //setProducts(result);
        dispatch(setProducts(result));
      }
    };

    if (editProduct) {
      setValue("Name", products.name);
      setValue("Price", products.price);
      setValue("NewPrice", products.newPrice);
      setValue("Category", products.category);
      setValue("Image", products.thumbnail);
    }

    fetchCourses();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.Name !== products.name ||
      currentValues.Price !== products.price ||
      currentValues.NewPrice !== products.newPrice ||
      currentValues.Category !== products.category ||
      currentValues.Image !== products.thumbnail
    );
  };

  const onSubmit = async (data) => {
    if (editProduct && isFormUpdated()) {
      const formData = new FormData();

if (editProductId) {
  const productToEdit = products.find(product => product._id === editProductId);
  formData.append("productId", productToEdit._id);

  console.log("Edit productId is " , editProductId)

      if (data.Name !== productToEdit.name) formData.append("name", data.Name);
      if (data.Price !== productToEdit.price) formData.append("price", data.Price);
      if (data.NewPrice !== productToEdit.newPrice)
        formData.append("newPrice", data.NewPrice);
      if (data.Category !== productToEdit.category)
        formData.append("category", data.Category);
      if (data.Image !== productToEdit.thumbnail)
        formData.append("thumbnail", data.Image);

      dispatch(setLoading(true));
      try {
        const result = await editProductsDetails(formData, token);
        if (result) {
          navigate('/products')
          console.log("Result of edit product is ", result);
        } else {
          console.log("Product is not edited ");
        }
      } catch (error) {
        console.error("Error editing product:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    } else {
      const formData = new FormData();
      formData.append("name", data.Name);
      formData.append("price", data.Price);
      formData.append("newPrice", data.NewPrice);
      formData.append("category", data.Category);
      formData.append("thumbnail", data.Image);

      console.log("Before ", formData);

      dispatch(setLoading(true));
      try {
        const result = await createProduct(formData, token, navigate);
        console.log("Result of create product is ", typeof result);
        //setAllProducts([...allproducts, result]);
        dispatch(setProducts(result));
        navigate("/products");
      } catch (error) {
        console.error("Error creating product:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const [editSection, setEditSection] = useState(null);

  function cancelEdit() {
    setEditSection(null);
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-red-800 text-center">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h1>
        <Link to="/products">
          <h3 className="p-3 mt-3 rounded-xl cursor-pointer bg-slate-400">
            All Products
          </h3>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div className="flex flex-col">
            <label
              htmlFor="Name"
              className="text-red-700 text-sm font-medium mb-1"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="Name"
              placeholder="Enter Product Title"
              {...register("Name", { required: "Product name is required" })}
              className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Name && (
              <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label
              htmlFor="Price"
              className="text-red-700 text-sm font-medium mb-1"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="Price"
              placeholder="Enter Product Price"
              {...register("Price", { required: "Product price is required" })}
              className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Price.message}
              </p>
            )}
          </div>

          {/* Offer Price */}
          <div className="flex flex-col">
            <label
              htmlFor="NewPrice"
              className="text-red-700 text-sm font-medium mb-1"
            >
              Offer Price <span className="text-red-500">*</span>
            </label>
            <input
              id="NewPrice"
              placeholder="Enter Offer Price"
              {...register("NewPrice", { required: "Offer price is required" })}
              className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.NewPrice && (
              <p className="text-red-500 text-xs mt-1">
                {errors.NewPrice.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="Category"
              className="text-red-700 text-sm font-medium mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="Category"
              placeholder="Enter Product Category"
              {...register("Category", {
                required: "Product category is required",
              })}
              className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Category.message}
              </p>
            )}
          </div>

          {/* Course thumbnail Image */}
          <Upload
            name="Image"
            label="Course thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editProduct ? products?.thumbnail : null}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editProduct ? "Save Changes" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Instructorportal;

























// import React, { useEffect } from "react"; 
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { setProducts, setLoading } from "../slices/userSlice";
// import Upload from "../components/Upload";
// import {        
//   editProductsDetails,
//   createProduct,
//   fetchInstructorCourses,
// } from "../services/operations/Authapi";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./pages/Navbar";
// import { Link } from "react-router-dom";

// function Instructorportal() {
//   const { token, editProductId } = useSelector((state) => state.auth);
//   const { products } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const result = await fetchInstructorCourses(token);
//       if (result) {
//         dispatch(setProducts(result));
//       }
//     };

//     fetchCourses();
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (editProductId && products.length > 0) {
//       const productToEdit = products.find(product => product._id === editProductId);
//       if (productToEdit) {
//         reset({
//           Name: productToEdit.name,
//           Price: productToEdit.price,
//           NewPrice: productToEdit.newPrice,
//           Category: productToEdit.category,
//           Image: productToEdit.thumbnail,
//         });
//       }
//     }
//   }, [editProductId, products, reset]);

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     if (editProductId) {
//       const productToEdit = products.find(product => product._id === editProductId);
//       formData.append("productId", productToEdit._id);

//       formData.append("name", data.Name);
//       formData.append("price", data.Price);
//       formData.append("newPrice", data.NewPrice);
//       formData.append("category", data.Category);
//       if (data.Image !== productToEdit.thumbnail) {
//         formData.append("thumbnail", data.Image);
//       }

//       dispatch(setLoading(true));
//       try {
//         const result = await editProductsDetails(formData, token);
//         console.log("Result of edit product is ", result);
//       } catch (error) {
//         console.error("Error editing product:", error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     } else {
//       formData.append("name", data.Name);
//       formData.append("price", data.Price);
//       formData.append("newPrice", data.NewPrice);
//       formData.append("category", data.Category);
//       formData.append("thumbnail", data.Image);

//       dispatch(setLoading(true));
//       try {
//         const result = await createProduct(formData, token, navigate);
//         dispatch(setProducts(result));
//         navigate("/products");
//       } catch (error) {
//         console.error("Error creating product:", error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-semibold mb-6 text-red-800 text-center">
//           {editProductId ? "Edit Product" : "Add New Product"}
//         </h1>
//         <Link to="/products">
//           <h3 className="p-3 mt-3 rounded-xl cursor-pointer bg-slate-400">
//             All Products
//           </h3>
//         </Link>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Product Name */}
//           <div className="flex flex-col">
//             <label htmlFor="Name" className="text-red-700 text-sm font-medium mb-1">
//               Product Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="Name"
//               placeholder="Enter Product Title"
//               {...register("Name", { required: "Product name is required" })}
//               className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.Name && (
//               <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
//             )}
//           </div>

//           {/* Price */}
//           <div className="flex flex-col">
//             <label htmlFor="Price" className="text-red-700 text-sm font-medium mb-1">
//               Price <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="Price"
//               placeholder="Enter Product Price"
//               {...register("Price", { required: "Product price is required" })}
//               className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.Price && (
//               <p className="text-red-500 text-xs mt-1">{errors.Price.message}</p>
//             )}
//           </div>

//           {/* Offer Price */}
//           <div className="flex flex-col">
//             <label htmlFor="NewPrice" className="text-red-700 text-sm font-medium mb-1">
//               Offer Price <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="NewPrice"
//               placeholder="Enter Offer Price"
//               {...register("NewPrice", { required: "Offer price is required" })}
//               className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.NewPrice && (
//               <p className="text-red-500 text-xs mt-1">{errors.NewPrice.message}</p>
//             )}
//           </div>

//           {/* Category */}
//           <div className="flex flex-col">
//             <label htmlFor="Category" className="text-red-700 text-sm font-medium mb-1">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="Category"
//               placeholder="Enter Product Category"
//               {...register("Category", { required: "Product category is required" })}
//               className="px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.Category && (
//               <p className="text-red-500 text-xs mt-1">{errors.Category.message}</p>
//             )}
//           </div>

//           {/* Course thumbnail Image */}
//           <Upload
//             name="Image"
//             label="Course thumbnail"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             editData={editProductId ? products.find(product => product._id === editProductId)?.thumbnail : null}
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {editProductId ? "Save Changes" : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Instructorportal;
