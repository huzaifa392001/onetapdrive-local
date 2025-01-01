import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: "general",
    initialState: {
        downloadPopup: false, // Default value
        categories: [],
        currentLocation: "", // Stores city name or user-provided location
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
    },
});

export const { SET_DOWNLOAD_POPUP, SET_CATEGORIES, SET_CURRENT_LOCATION } = generalSlice.actions;
export default generalSlice.reducer;
