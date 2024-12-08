
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setCart } from "../../slices/userSlice";
// import { getAllBuyProduct } from "../../services/operations/Authapi";
// import { useParams } from "react-router-dom";
// import Navbar from '../pages/Navbar'

// function Cart() {
//   const { loading, currentId, cart } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   useEffect(() => {
//     const buyHandler = async () => {
//       dispatch(setLoading(true));
//       try {
//         const result = await getAllBuyProduct();
//         console.log("Result: ", result);
//         dispatch(setCart(result));
//       } catch (error) {
//         console.error(error.message);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     buyHandler();
//   }, [currentId, dispatch]);

//   return (
//     <div className="overflow-x-hidden">
//       <Navbar/>
//       <h1 className="font-bold text-3xl text-center p-3 text-red-800 mt-20">Ordered Food</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cart.map((product, index) => (
//               <div key={index} className="shadow-md shadow-red-400 m-8 p-2 bg-red-100">
//                 {product.details &&
//                   product.details.length > 0 &&
//                   product.details.map((detail, detailIndex) => {
//                     return <div className=" flex justify-around ">
//                     <img
//                       key={detailIndex}
//                       src={detail.thumbnail}
//                       alt={detail.name || "Product thumbnail"}
//                       className="h-[100px] w-[150px]"
//                     />
//                     <div className="w-[300px] first-letter:uppercase">
//                      <div className="font-semibold text-xl">{detail.name}</div>
//                     <div className="line-through">Rs.{detail.price}</div>
//                     <div>Rs.{detail.newPrice}</div>
//                     </div>
//                     </div>
//                 })}
              
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;





import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setCart } from "../../slices/userSlice";
import { getAllBuyProduct } from "../../services/operations/Authapi";
import { useParams } from "react-router-dom";
import Navbar from '../pages/Navbar'

function Cart() {
  const { loading, currentId, cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const buyHandler = async () => {
      dispatch(setLoading(true));
      try {
        const result = await getAllBuyProduct();
        console.log("Result: ", result);
        dispatch(setCart(result));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    buyHandler();
  }, [currentId, dispatch]);

  return (
    <div className="overflow-x-hidden bg-red-50">
      <Navbar />
      <h1 className="font-bold text-4xl text-center p-6 text-red-800 mt-20">Ordered Food</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20 text-xl font-semibold text-red-500">
              Your cart is empty.
            </div>
          ) : (
            cart.map((product, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                {product.details &&
                  product.details.length > 0 &&
                  product.details.map((detail, detailIndex) => {
                    return (
                      <div
                        key={detailIndex}
                        className="flex flex-col md:flex-row justify-between items-center p-6 bg-red-100 hover:bg-red-200 transition duration-300 ease-in-out"
                      >
                        <img
                          src={detail.thumbnail}
                          alt={detail.name || "Product thumbnail"}
                          className="h-[150px] w-[200px] object-cover rounded-lg shadow-md mb-4 md:mb-0"
                        />
                        <div className="md:w-[60%] ml-4">
                          <div className="font-semibold text-2xl text-red-800">{detail.name}</div>
                          <div className="text-lg text-red-500 line-through">Rs. {detail.price}</div>
                          <div className="text-xl text-red-600 mt-2">Rs. {detail.newPrice}</div>
                        </div>
                        <div className="mt-4 md:mt-0 flex justify-center items-center md:w-[20%]">
                          {/* Add button or action for cart item (like Remove or Update Quantity) */}
                          <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
