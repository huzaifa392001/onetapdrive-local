import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        isActive: false,
        loading: false,
        query: "",
        requestedProduct: [],
    },
    reducers: {
        SET_IS_ACTIVE(state, action) {
            state.isActive = action.payload;
        },
        SET_LOADING(state, action) {
            state.loading = action.payload;
        },
        SET_QUERY(state, action) {
            state.query = action.payload;
        },
        SET_REQUESTED_PRODUCT(state, action) {
            state.requestedProduct = action.payload;
        },
    },
});

export const { SET_IS_ACTIVE, SET_LOADING, SET_QUERY, SET_REQUESTED_PRODUCT } = searchSlice.actions;
export default searchSlice.reducer;
