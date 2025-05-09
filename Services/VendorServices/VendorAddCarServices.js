import { SET_BAGS, SET_BODYTYPES, SET_BRANDS, SET_CATEGORIES, SET_CITIES, SET_COLORS, SET_DOORS, SET_FEATURES, SET_FUEL_TYPE, SET_LUGGAGES, SET_MAKE_YEAR, SET_SEATING, SET_SERVICE_TYPE, SET_SPECS, SET_TRANSMISSION } from "@/Redux/Slices/Car";
import API from "../Constants/api";
import { store } from "@/Redux/Store";

export const createCar = async (formData) => {
    try {
        const response = await API.post("/cars", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
};

export const createCwd = async (formData) => {
    try {
        const response = await API.post("/cars/create-car-with-driver", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating cwd:", error);
        throw error;
    }
};

export const getCarBrands = async () => {
    try {
        const response = await API.get("/brands");
        store.dispatch(SET_BRANDS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Brands:", error);
        throw error;
    }
}

export const getCarModelsByBrand = async (brandId) => {
    try {
        const response = await API.get(`/models?brandId=${brandId}`);
        // store.dispatch(SET_BRANDS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Brands:", error);
        throw error;
    }
}

export const getCarBodyTypes = async () => {
    try {
        const response = await API.get("/body_types");
        store.dispatch(SET_BODYTYPES(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Body Types:", error);
        throw error;
    }
}

export const getCities = async () => {
    try {
        const response = await API.get("/cities");
        store.dispatch(SET_CITIES(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Cities:", error);
        throw error;
    }
}

export const getMakeYears = async () => {
    try {
        const response = await API.get("/make_years");
        store.dispatch(SET_MAKE_YEAR(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Make Years:", error);
        throw error;
    }
}

export const getCarCategories = async () => {
    try {
        const response = await API.get("/categories");
        store.dispatch(SET_CATEGORIES(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Cateogries:", error);
        throw error;
    }
}

export const getColors = async () => {
    try {
        const response = await API.get("/colors");
        store.dispatch(SET_COLORS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Cateogries:", error);
        throw error;
    }
}

export const getFeatures = async () => {
    try {
        const response = await API.get("/features");
        store.dispatch(SET_FEATURES(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Cateogries:", error);
        throw error;
    }
}

export const getTransmission = async () => {
    try {
        const response = await API.get("/transmissions");
        store.dispatch(SET_TRANSMISSION(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Cateogries:", error);
        throw error;
    }
}

export const getSpecs = async () => {
    try {
        const response = await API.get("/specs");
        store.dispatch(SET_SPECS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Specs:", error);
        throw error;
    }
}

export const getSeating = async () => {
    try {
        const response = await API.get("/seating_capacities");
        store.dispatch(SET_SEATING(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Capacities:", error);
        throw error;
    }
}

export const getBags = async () => {
    try {
        const response = await API.get("/bag_fits");
        store.dispatch(SET_BAGS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Bag Fits:", error);
        throw error;
    }
}

export const getDoors = async () => {
    try {
        const response = await API.get("/doors");
        store.dispatch(SET_DOORS(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Doors:", error);
        throw error;
    }
}

export const getFuelTypes = async () => {
    try {
        const response = await API.get("/fuel_types");
        store.dispatch(SET_FUEL_TYPE(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Fuel Types:", error);
        throw error;
    }
}

export const getLuggages = async () => {
    try {
        const response = await API.get("/luggages");
        store.dispatch(SET_LUGGAGES(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Luggaeges:", error);
        throw error;
    }
}

export const getService = async () => {
    try {
        const response = await API.get("/service_types");
        store.dispatch(SET_SERVICE_TYPE(response?.data?.data));
        return response?.data; // Return fetched data
    } catch (error) {
        console.error("Error fetching Seating Service Types:", error);
        throw error;
    }
}


