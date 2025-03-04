// import API from "../Constants/api"
// import { store } from "@/Redux/Store";
// import { SET_ACCESS_TOKEN, SET_IS_ADMIN } from "@/Redux/Slices/Auth"
// import { Bounce, toast } from "react-toastify";
// export const getBrands = async () => {




// };

// export const adminLogin = async (data) => {
//     try {
//         const response = await API.get("/brands");

//         console.log("response =>", response);

//         if (response?.data?.success && response?.data?.data) {
//             return response.data.data;
//         } else {
//             throw new Error("Failed to fetch brands");
//         }
//     } catch (e) {
//         console.error("Error fetching brands:", e.message);
//         return [];
//     }
// };



// export const getCategoryById = async (id) => {
//     try {
//         const response = await API.get(`/categories/${id}`);
//         return response;
//     } catch (error) {
//         console.error('Error fetching category:', error);
//         throw error;
//     }
// };


// export const deleteCategory = async (id) => {
//     try {
//         const state = store.getState();
//         const token = state.auth.accessToken; // Get token for authorization
//         const response = await API.delete(`/categories/${id}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         console.log("Category deleted: ", response);
//         return response;
//     } catch (e) {
//         console.error("Error deleting category:", e);
//     }
// };

// export const postCategory = async (data) => {
//     try {
//         const state = store.getState();
//         const token = state.auth.accessToken; // Assuming 'auth' is the slice name and 'accessToken' is the token field
//         console.log("Token=> ", token);

//         const formData = new FormData();
//         formData.append('name', data.categoryTitle);
//         formData.append('titles', data.pageHeading);
//         formData.append('description', data.pageDescription);
//         if (data.categoryImage[0]) {
//             formData.append('image', data.categoryImage[0]);
//         }

//         const response = await API.post('/categories', formData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response;
//     } catch (e) {
//         console.error(e);
//     }
// };
// export const deleteBrand = async (id) => {
//     try {
//         const response = await API.delete(`/brands/${id}`);
//         if (response?.data?.success) {
//             console.log("Brand deleted successfully");
//             return response.data;
//         } else {
//             throw new Error("Failed to delete Brand");
//         }
//     } catch (e) {
//         console.log("Error Deleting Brand", e.message);
//     }
// };
