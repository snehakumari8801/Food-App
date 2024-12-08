const BASE_URL = process.env.REACT_APP_BASE_URL


export const endpoints = {
    SIGNUP_API: BASE_URL + '/signup',
    LOGIN_API: BASE_URL + '/login',
    CREATE_PRODUCT_API: BASE_URL + '/createproduct',
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/getInstructorCourses",
    GET_ALL_PRODUCTS_API : BASE_URL + "/getAllProducts",
   EDIT_PRODUCT_API: BASE_URL + "/editProduct",
   GET_FULL_PRODUCT_DETAILS_AUTHENTICATED: BASE_URL + "/getFullProductDetails",
   DELETE_PRODUCT_API: BASE_URL + "/deleteProduct",
   BUY_PRODUCT_API : BASE_URL + "/buyProduct",
   GET_ALL_BUY_PRODUCT : BASE_URL + "/getAllBuyproducts"
}