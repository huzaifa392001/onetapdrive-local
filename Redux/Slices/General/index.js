import Categories from "@/Components/FrontComponents/HomePageLayout/Categories/Categories";
import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: "general",
    initialState: {
        downloadPopup: false, // Default value
        categories: []
    },
    reducers: {
        SET_DOWNLOAD_POPUP(state, action) {
            state.downloadPopup = action.payload;
        },
        SET_CATEGORIES(state, action) {
            state.categories = action.payload;
        },
    },
});

export const { SET_DOWNLOAD_POPUP, SET_CATEGORIES } = generalSlice.actions;
export default generalSlice.reducer;
