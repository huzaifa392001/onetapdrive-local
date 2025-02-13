import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isVendor: false,
        isAdmin: false,
        isUser: false,
        accessToken: ''
    },
    reducers: {
        SET_IS_VENDOR(state, action) {
            state.isVendor = action.payload; // Pass boolean explicitly
        },
        SET_IS_ADMIN(state, action) {
            state.isAdmin = action.payload; // Pass boolean explicitly
        },
        SET_IS_USER(state, action) {
            state.isUser = action.payload;
        },
        SET_ACCESS_TOKEN(state, action) {
            state.accessToken = action.payload
        }
    },
});

export const {
    SET_IS_VENDOR,
    SET_IS_ADMIN,
    SET_IS_USER,
    SET_ACCESS_TOKEN
} = authSlice.actions;

export default authSlice.reducer;
