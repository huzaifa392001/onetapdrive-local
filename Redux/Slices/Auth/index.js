import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isVendor: false,
        isAdmin: false,
    },
    reducers: {
        SET_IS_VENDOR(state, action) {
            state.isVendor = action.payload; // Pass boolean explicitly
        },
        SET_IS_ADMIN(state, action) {
            state.isAdmin = action.payload; // Pass boolean explicitly
        },
    },
});

export const { SET_IS_VENDOR, SET_IS_ADMIN } = authSlice.actions;
export default authSlice.reducer;
