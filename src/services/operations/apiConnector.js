import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}








// import axios from "axios";

// // Create an Axios instance
// export const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE_URL, // Set your API base URL here
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Function to retrieve the token (you can customize this)
// const getToken = () => {
//     // Replace this with your token retrieval logic (e.g., from local storage or Redux store)
//     return localStorage.getItem('token'); // Example: getting token from localStorage
// };

// // API connector function
// export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
//     // Include the token in headers
//     const token = getToken();
//     if (token) {
//         headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//         const response = await axiosInstance({
//             method,
//             url,
//             data: bodyData,
//             headers,
//             params,
//         });
        
//         return response; // Return the response for further processing
//     } catch (error) {
//         // Handle errors gracefully
//         console.error("API call error:", error);
//         throw error; // Rethrow the error for further handling
//     }
// };
