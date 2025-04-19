import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        isActive: false,
        loading: false,
        query: "",
        requestedProduct: [],
        searchParam: {
            search: "",
            category: "",
            sort: "",
            price: {
                min: "",
                max: ""
            },
            location: "",
            brand: "",
            model: "",
            model_year: "",
            seats: "",
            type: "",
            car_features: [],
            transmission: "",
            fuel_type: "",
            color: []
        }
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
        SET_SEARCH_PARAMS(state, action) {

            state.searchParam = {
                ...state.searchParam,  // Keep existing fields
                ...action.payload,  // Overwrite only fields provided in the payload
                price: {
                    ...state.searchParam.price,  // Preserve existing price fields
                    ...action.payload.price,  // Overwrite price fields if provided
                },
                car_features: action.payload.car_features || state.searchParam.car_features, // Preserve or update car_features
                color: action.payload.color || state.searchParam.color, // Preserve or update color
            };
        }
    },
});

export const { SET_IS_ACTIVE, SET_LOADING, SET_QUERY, SET_REQUESTED_PRODUCT, SET_SEARCH_PARAMS } = searchSlice.actions;
export default searchSlice.reducer;
