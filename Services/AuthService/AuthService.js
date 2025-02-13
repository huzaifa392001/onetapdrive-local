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