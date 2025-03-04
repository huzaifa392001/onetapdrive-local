import { SET_ACCESS_TOKEN, SET_IS_ADMIN } from "@/Redux/Slices/Auth";
import { store } from "@/Redux/Store";
import API from "../Constants/api";

export const login = async (data) => {
    try {
        const res = await API.post("/auth/login", data);        
        store.dispatch(SET_ACCESS_TOKEN(res?.data?.data?.access_token));
        store.dispatch(SET_IS_ADMIN(true));
        return res.data; // Return response data
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Login failed!"); // Ensure error is thrown
    }
}

export const logout = async () => {
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