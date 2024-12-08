import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../slices/userSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    auth : dataReducer,
    // Add other reducers here
  },
});

export default store;
