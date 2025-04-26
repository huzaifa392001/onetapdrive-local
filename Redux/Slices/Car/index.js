import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
    name: "car",
    initialState: {
        cities: [],
        brands: [],
        bodyTypes: [],
        makeYears: [],
        categories: [],
        colors: [],
        features: [],
        transmission: [],
        specs: [],
        seating: [],
        bags: [],
        doors: [],
        fuelType: [],
        lagguages: [],
        serviceTypes: []
    },
    reducers: {
        SET_CITIES(state, action) {
            state.cities = action.payload; // Pass boolean explicitly
        },
        SET_BRANDS(state, action) {
            state.brands = action.payload; // Pass boolean explicitly
        },
        SET_BODYTYPES(state, action) {
            state.bodyTypes = action.payload; // Pass boolean explicitly
        },
        SET_MAKE_YEAR(state, action) {
            state.makeYears = action.payload; // Pass boolean explicitly
        },
        SET_CATEGORIES(state, action) {
            state.categories = action.payload; // Pass boolean explicitly
        },
        SET_COLORS(state, action) {
            state.colors = action.payload; // Pass boolean explicitly
        },
        SET_FEATURES(state, action) {
            state.features = action.payload; // Pass boolean explicitly
        },
        SET_TRANSMISSION(state, action) {
            state.transmission = action.payload; // Pass boolean explicitly
        },
        SET_SPECS(state, action) {
            state.specs = action.payload; // Pass boolean explicitly
        },
        SET_SEATING(state, action) {
            state.seating = action.payload; // Pass boolean explicitly
        },
        SET_BAGS(state, action) {
            state.bags = action.payload; // Pass boolean explicitly
        },
        SET_DOORS(state, action) {
            state.doors = action.payload; // Pass boolean explicitly
        },
        SET_FUEL_TYPE(state, action) {
            state.fuelType = action.payload; // Pass boolean explicitly
        },
        SET_LUGGAGES(state, action) {
            state.lagguages = action.payload; // Pass boolean explicitly
        },
        SET_SERVICE_TYPE(state, action) {
            state.serviceTypes = action.payload; // Pass boolean explicitly
        },

    },
});

export const {
    SET_CITIES,
    SET_BRANDS,
    SET_BODYTYPES,
    SET_MAKE_YEAR,
    SET_CATEGORIES,
    SET_COLORS,
    SET_FEATURES,
    SET_TRANSMISSION,
    SET_SPECS,
    SET_SEATING,
    SET_BAGS,
    SET_DOORS,
    SET_FUEL_TYPE,
    SET_LUGGAGES,
    SET_SERVICE_TYPE
} = carSlice.actions;

export default carSlice.reducer;
