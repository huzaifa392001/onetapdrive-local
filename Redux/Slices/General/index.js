import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: "general",
    initialState: {
        downloadPopup: false, // Default value
        categories: [],
        brands: [],
        currentLocation: "", // Stores city name or user-provided location
        userModalStatus: false
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
        SET_BRANDS(state, action) {
            state.brands = action.payload;
        }
    },
});

export const {
    SET_DOWNLOAD_POPUP,
    SET_CATEGORIES,
    SET_CURRENT_LOCATION,
    SET_USER_MODAL_STATUS,
    SET_BRANDS
} = generalSlice.actions;
export default generalSlice.reducer;
