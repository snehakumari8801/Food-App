// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { CiPizza } from "react-icons/ci";
// import { CiBurger } from "react-icons/ci";
// import { GiNoodles } from "react-icons/gi";
// import { login } from '../../services/operations/Authapi';

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const { email, password } = formData;

//   const submitHandler = (e) => {
//     e.preventDefault();

//     let result = dispatch(login(email, password, navigate));

//     if(!result){
//       console.log("loading...")
//     }

//   }

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   }

//   return (
//     <div className="flex items-center justify-around min-h-screen bg-red-800 ">
//     <div className=''>
//     <CiPizza className='text-red-400 text-[100px] -translate-y-[9rem] translate-x-[14rem]'/>
//     <CiBurger className='text-red-400 text-[100px] translate-x-[3rem]'/>
//     <GiNoodles className='text-red-400 text-[100px] translate-y-[9rem] translate-x-[14rem]'/>
//     </div>
//    <div className='text-white font-bold text-4xl  shadow-white shadow-lg mr-[400px] p-7 transition-all duration-10 ease-in transform slide-in'>
//     <p>Welcome to the <span className='text-red-300'>FOOD CODE!</span></p>
//     <p className='pt-4'>Enjoy food with <span className='text-red-300 pt-4'>FOOD CODE</span></p>

// </div>

//       <div className="text-center  mr-[100px] bg-red-100 border-2 p-8 rounded-sm shadow-md w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">Log In</h1>
//         <form onSubmit={submitHandler} className="space-y-4">
//           <div>
//             <input
//               type='email'
//               placeholder='Email'
//               name='email'
//               value={email}
//               onChange={changeHandler}
//               className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <input
//               type='password'
//               placeholder='Password'
//               name='password'
//               value={password}
//               onChange={changeHandler}
//               className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type='submit'
//             className="w-full py-2 bg-red-800 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import { CiBurger } from "react-icons/ci";
import { GiNoodles } from "react-icons/gi";
import { login } from "../../services/operations/Authapi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const submitHandler = (e) => {
    e.preventDefault();

    let result = dispatch(login(email, password, navigate));

    if (!result) {
      console.log("loading...");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 to-red-500 overflow-hidden">
      {/* Icon section */}
      <div className="absolute top-30 left-5  flex justify-between w-full px-4 text-red-400 overflow-hidden">
        <CiPizza className="text-[120px] sm:text-[150px] lg:text-[200px] transform -translate-x-12" />
        <CiBurger className="text-[120px] sm:text-[150px] lg:text-[200px] transform translate-x-12" />
        <GiNoodles className="text-[120px] sm:text-[150px] lg:text-[200px] transform translate-y-12 translate-x-24" />
      </div>

      {/* Login Form */}
      <div className="relative bg-white bg-opacity-80 p-8  rounded-lg shadow-xl z-10 w-full sm:max-w-md overflow-hidden">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-red-800">
            Welcome to <span className="text-red-500">FOOD COURT!</span>
          </p>
          <p className="text-xl text-red-600 mt-2">
            Enjoy food with <span className="text-red-500">FOOD COURT</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-800 text-white rounded-md hover:bg-red-600 
            transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>

        {/* Add forgot password */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-red-500 hover:text-red-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Google
          </button>
          <button className="px-4 py-2 bg-red-800 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
