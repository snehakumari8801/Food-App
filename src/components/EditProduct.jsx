import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setProducts, setEditProduct } from "../slices/userSlice";
import Instructorportal from "../components/Instructorportal";
import { fetchProductsDetails } from "../services/operations/Authapi";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { products } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { token, editProduct } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await fetchProductsDetails(productId, token, dispatch);
        console.log("Edit result ", result);
        if (result) {
          dispatch(setEditProduct(true));
          dispatch(setProducts(result));
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-red-800 mb-8">
          Edit Product
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {products ? (
            <Instructorportal />
          ) : (
            <p className="text-center text-2xl font-semibold text-red-600">
              Course not found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}




