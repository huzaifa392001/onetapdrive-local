import { SET_ACCESS_TOKEN, SET_ADMIN_DETAILS, SET_IS_ADMIN, SET_IS_VENDOR } from "@/Redux/Slices/Auth";
import { store } from "@/Redux/Store";
import API from "../Constants/api";

export const login = async (data) => {
    try {
        const res = await API.post("/auth/login", data);
        return res.data; // Return response data
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Login failed!"); // Ensure error is thrown
    }
}

export const adminLogout = async () => {
    try {
        // Optionally, you can make an API call to invalidate the token on the server side
        // await API.post("/auth/logout");

        // Clear the access token and update the Redux store
        store.dispatch(SET_ACCESS_TOKEN(null));
        store.dispatch(SET_IS_ADMIN(false));
        console.log("Logged out successfully");
    } catch (e) {
        console.error(`Error during logout: ${e}`);
        throw new Error(e.response?.data?.message || "Logout failed!"); // Ensure error is thrown
    }
}

export const vendorLogout = async () => {
    try {
        // Optionally, you can make an API call to invalidate the token on the server side
        // await API.post("/auth/logout");

        store.dispatch(SET_ACCESS_TOKEN(null));
        store.dispatch(SET_IS_VENDOR(false));
        console.log("Logged out successfully");
    } catch (e) {
        console.error(`Error during logout: ${e}`);
        throw new Error(e.response?.data?.message || "Logout failed!"); // Ensure error is thrown
    }
}

export const vendorSignup = async (data) => {
    try {
        const res = await API.post("/vendors", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Signup failed!"); // Ensure error is thrown
    }
}
