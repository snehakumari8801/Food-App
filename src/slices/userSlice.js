import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  products: null, // Changed from null to an empty array, assuming products are expected to be an array
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  signupData: null,
  step: "",
  error: null,
  editProduct: null,
  editProductId: null,
  formDetails: [], // Initialized as an empty object
  cart: [],
  currentId: null,
  isToggle: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormDetails: (state, action) => {
      state.formDetails = action.payload; // Ensure action.payload is a plain object
    },
    setUser(state, value) {
      state.user = value.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload; // Ensure action.payload is serializable
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // Update localStorage whenever the token is set
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setEditProductId: (state, action) => {
      state.editProductId = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setIsToggle: (state, action) => {
      state.isToggle = action.payload;
    },
  },
});

// Export actions
export const {
  setFormDetails,
  setStep,
  setLoading,
  setProducts,
  setSignupData,
  setToken,
  setError,
  setUser,
  setEditProduct,
  setEditProductId,
  setCart,
  setCurrentId,
  isToggle,
  setIsToggle,
  user
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
