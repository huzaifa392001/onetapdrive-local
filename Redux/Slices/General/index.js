import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: "general",
    initialState: {
        downloadPopup: false, // Default value
        categories: [],
        cities: [],
        brands: [],
        currentLocation: "", // Stores city name or user-provided location
        userModalStatus: false,
        otpModalStatus: false,
        lenisDisable: false,
    },
    reducers: {
        SET_DOWNLOAD_POPUP(state, action) {
            state.downloadPopup = action.payload;
        },
        SET_CATEGORIES(state, action) {
            state.categories = action.payload;
        },
        SET_CURRENT_LOCATION(state, action) {
            state.currentLocation = action.payload; // Update currentLocation in state
        },
        SET_USER_MODAL_STATUS(state, action) {
            state.userModalStatus = action.payload;
        },
        SET_CITIES(state, action) {
            state.cities = action.payload;
        },
        SET_BRANDS(state, action) {
            state.brands = action.payload;
        },
        SET_OTP_MODAL_STATUS(state, action) {
            state.otpModalStatus = action.payload
        },
        SET_LENIS_DISABLE(state, action) {
            state.lenisDisable = action.payload;
        },

    },
});

export const {
    SET_DOWNLOAD_POPUP,
    SET_CATEGORIES,
    SET_CURRENT_LOCATION,
    SET_USER_MODAL_STATUS,
    SET_CITIES,
    SET_BRANDS,
    SET_OTP_MODAL_STATUS,
    SET_LENIS_DISABLE,
} = generalSlice.actions;
export default generalSlice.reducer;
