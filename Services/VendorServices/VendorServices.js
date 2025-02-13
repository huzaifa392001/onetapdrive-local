import { SET_ACCESS_TOKEN, SET_IS_VENDOR } from "@/Redux/Slices/Auth"
import { store } from "@/Redux/Store"
import { Bounce, toast } from "react-toastify";
import API from "./api";

// export const VendorServices = {
//     login: async (data) => {
//         try {

//         }
//         catch (e) {
//             console.error(`Error making Request: ${e}`)
//             const response = await API.post("/auth/login", data);
//             store.dispatch(SET_IS_VENDOR(true));
//             return response.data; // Returns the API response
//         }
//     },

//     logout: async () => {
//         try {
//             toast.success('Logout Successfully!', {
//                 position: "top-right",
//                 autoClose: 1500,
//                 hideProgressBar: true,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: false,
//                 progress: undefined,
//                 transition: Bounce,
//             });
//             store.dispatch(SET_IS_VENDOR(false))
//         }
//         catch (e) {
//             console.error(`Error making Request: ${e}`)
//             // Clear token from localStorage
//             localStorage.removeItem("access_token");
//             localStorage.removeItem("token_type");
//             localStorage.removeItem("expires_in");

//             // Dispatch Redux action
//             store.dispatch(SET_IS_VENDOR(false));
//         }
//     },

//     signup: async () => {
//         try {
//             toast.success('Success', {
//                 position: "top-right",
//                 autoClose: 1500,
//                 hideProgressBar: true,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: false,
//                 progress: undefined,
//                 transition: Bounce,
//             });
//         }
//         catch (e) {
//             console.error("error=> ", e)
//             toast.error(e, {
//                 position: "top-right",
//                 autoClose: 1500,
//                 hideProgressBar: true,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: false,
//                 progress: undefined,
//                 transition: Bounce,
//             });
//         }
//     }
// };

export const vendorLogin = async (data) => {
    try {
        const res = await API.post("/auth/login", data);
        store.dispatch(SET_ACCESS_TOKEN(res?.data?.data?.access_token));
        store.dispatch(SET_IS_VENDOR(true));
        return res.data; // Return response data
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Login failed!"); // Ensure error is thrown
    }
};

export const vendorLogout = async () => {
    try {
        store.dispatch(SET_ACCESS_TOKEN(null))
        store.dispatch(SET_IS_VENDOR(false))
    }
    catch (e) {
        console.error(`Error making Request: ${e}`)
    }
}