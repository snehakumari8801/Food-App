import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../../services/operations/Authapi";
import { setLoading, setSignupData } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    dispatch(setLoading(true));
    dispatch(
      signup(
        data.Firstname,
        data.Lastname,
        data.Password,
        data.Email,
        data.Role,
        navigate
      )
    )
      .then(() => {
        setErrorMessage(null);
        dispatch(setSignupData(data));
        console.log("Signup successful:", data);
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        setErrorMessage("Signup failed, please try again.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }

  return (
    <div className="flex items-center p-5 pt-10 pb-40 sm:p-24 justify-center w-[100%] overflow-x-hidden bg-gradient-to-r from-red-100 to-red-500">
      <Navbar />
      <div className="bg-white p-8 rounded-xl shadow-xl w-full  max-w-lg">
        <h1 className="text-3xl font-semibold text-red-800 mb-6 text-center">
          Signup to <span className="text-red-500">Food Code</span>
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Firstname */}
          <div>
            <label
              htmlFor="Firstname"
              className="block text-red-700 text-sm font-medium"
            >
              Firstname
            </label>
            <input
              id="Firstname"
              placeholder="Enter your first name"
              {...register("Firstname", { required: "Firstname is required" })}
              className="w-full px-4 py-3 mt-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Firstname.message}
              </p>
            )}
          </div>

          {/* Lastname */}
          <div>
            <label
              htmlFor="Lastname"
              className="block text-red-700 text-sm font-medium"
            >
              Lastname
            </label>
            <input
              id="Lastname"
              placeholder="Enter your last name"
              {...register("Lastname", { required: "Lastname is required" })}
              className="w-full px-4 py-3 mt-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Lastname.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-red-700 text-sm font-medium"
            >
              Password
            </label>
            <input
              id="Password"
              type="password"
              placeholder="Enter your password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className="w-full px-4 py-3 mt-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="Email"
              className="block text-red-700 text-sm font-medium"
            >
              Email
            </label>
            <input
              id="Email"
              type="email"
              placeholder="Enter your email"
              {...register("Email", { required: "Email is required" })}
              className="w-full px-4 py-3 mt-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="Role"
              className="block text-red-700 text-sm font-medium"
            >
              Role (Customer/Instructor)
            </label>
            <input
              id="Role"
              type="text"
              {...register("Role", { required: "Role is required" })}
              className="w-full px-4 py-3 mt-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.Role && (
              <p className="text-red-500 text-sm mt-1">{errors.Role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-800 text-white rounded-md hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <Link to="/login">
            <p className="text-red-500 hover:underline">
              Already have an account? Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
