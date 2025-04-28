import { SET_ACCESS_TOKEN, SET_ADMIN_DETAILS, SET_IS_ADMIN, SET_IS_USER, SET_IS_VENDOR, SET_USER_DETAILS, SET_VENDOR_DETAILS } from "@/Redux/Slices/Auth";
import { store } from "@/Redux/Store";
import API from "../Constants/api";

export const login = async (data) => {
    try {
        const res = await API.post("/auth/login", data);
        if (res?.data?.data?.user_details?.role?.name === "superadmin") {
            store.dispatch(SET_ADMIN_DETAILS(res?.data?.data?.user_details));
            store.dispatch(SET_IS_ADMIN(true));
            store.dispatch(SET_VENDOR_DETAILS(null));
            store.dispatch(SET_IS_VENDOR(false));
            store.dispatch(SET_USER_DETAILS(null));
            store.dispatch(SET_IS_USER(false));
        }
        else if (res?.data?.data?.user_details?.role?.name === "vendor") {
            if (res?.data?.data?.user_details?.status) {
                store.dispatch(SET_VENDOR_DETAILS(res?.data?.data?.user_details));
                store.dispatch(SET_IS_VENDOR(true));
                store.dispatch(SET_ADMIN_DETAILS(null));
                store.dispatch(SET_IS_ADMIN(false));
                store.dispatch(SET_USER_DETAILS(null));
                store.dispatch(SET_IS_USER(false));
            }
        }
        else if (res?.data?.data?.user_details?.role?.name === "client") {
            store.dispatch(SET_USER_DETAILS(res?.data?.data?.user_details));
            store.dispatch(SET_IS_USER(true));
            store.dispatch(SET_VENDOR_DETAILS(null));
            store.dispatch(SET_IS_VENDOR(false));
            store.dispatch(SET_ADMIN_DETAILS(null));
            store.dispatch(SET_IS_ADMIN(false));
        }
        store.dispatch(SET_ACCESS_TOKEN(res?.data?.data?.access_token));
        return res.data;
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Login failed!");
    }
}

export const adminLogout = async () => {
    try {
        await API.post("/auth/logout")
        store.dispatch(SET_ACCESS_TOKEN(null));
        store.dispatch(SET_IS_ADMIN(false));
        store.dispatch(SET_ADMIN_DETAILS(null))
    } catch (e) {
        console.error(`Error during logout: ${e}`);
        throw new Error(e.response?.data?.message || "Logout failed!");
    }
}

export const vendorLogout = async () => {
    try {
        await API.post("/auth/logout")
        store.dispatch(SET_ACCESS_TOKEN(null));
        store.dispatch(SET_IS_VENDOR(false));
        store.dispatch(SET_VENDOR_DETAILS(null))
    } catch (e) {
        console.error(`Error during logout: ${e}`);
        throw new Error(e.response?.data?.message || "Logout failed!");
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
        throw new Error(e.response?.data?.message || "Signup failed!");
    }
}

export const updateVendor = async (data) => {
    try {
        const res = await API.put("/vendors/update", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (e) {
        console.error(`Error making Request: ${e}`);
        throw new Error(e.response?.data?.message || "Signup failed!");
    }
}

export const userLogout = async () => {
    try {
        await API.post("/auth/logout")
        store.dispatch(SET_ACCESS_TOKEN(null));
        store.dispatch(SET_IS_USER(false));
        store.dispatch(SET_USER_DETAILS(null))
    } catch (e) {
        console.error(`Error during logout: ${e}`);
        throw new Error(e.response?.data?.message || "Logout failed!");
    }
}

export const userSignUp = async (data) => {
    try {
        const res = await API.post("/auth/signup", data);
        return res?.data;
    } catch (e) {
        console.error("Error during Signup:", e.response?.data || e.message);
        throw e; // Keep original Axios error
    }
};

export const sendOtp = async () => {
    try {
        const res = await API.post("/users/generate-otp");
        return res?.data;
    } catch (e) {
        console.error("Error during Signup:", e.response?.data || e.message);
        throw e; // Keep original Axios error
    }
}

export const verifyOtp = async (data) => {
    try {
        const res = await API.post("/users/verify-otp", data);
        return res?.data;
    } catch (e) {
        console.error("Error during Signup:", e.response?.data || e.message);
        throw e; // Keep original Axios error
    }
}

export const getCurrentUser = async () => {
    try {
        const res = await API.get("/auth/profile")
        if (res?.data?.data?.user_details?.role?.name === "superadmin") {
            store.dispatch(SET_ADMIN_DETAILS(res?.data?.data?.user_details));
            store.dispatch(SET_IS_ADMIN(true));
            store.dispatch(SET_VENDOR_DETAILS(null));
            store.dispatch(SET_IS_VENDOR(false));
            store.dispatch(SET_USER_DETAILS(null));
            store.dispatch(SET_IS_USER(false));
        }
        else if (res?.data?.data?.user_details?.role?.name === "vendor") {
            if (res?.data?.data?.user_details?.status) {
                store.dispatch(SET_VENDOR_DETAILS(res?.data?.data?.user_details));
                store.dispatch(SET_IS_VENDOR(true));
                store.dispatch(SET_ADMIN_DETAILS(null));
                store.dispatch(SET_IS_ADMIN(false));
                store.dispatch(SET_USER_DETAILS(null));
                store.dispatch(SET_IS_USER(false));
            }
        }
        else if (res?.data?.data?.user_details?.role?.name === "client") {
            store.dispatch(SET_USER_DETAILS(res?.data?.data?.user_details));
            store.dispatch(SET_IS_USER(true));
            store.dispatch(SET_VENDOR_DETAILS(null));
            store.dispatch(SET_IS_VENDOR(false));
            store.dispatch(SET_ADMIN_DETAILS(null));
            store.dispatch(SET_IS_ADMIN(false));
        }
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
        throw error;
    }
}

export const forgotPassword = async (data) => {
    try {
        const res = await API.post("/auth/forgot-password", data);
        return res?.data;
    } catch (error) {
        console.error("Error forgot Password:", error);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const res = await API.post("auth/reset-password", data);
        return res?.data;
    } catch (error) {
        console.error("Error reste Password:", error);
        throw error;
    }
};