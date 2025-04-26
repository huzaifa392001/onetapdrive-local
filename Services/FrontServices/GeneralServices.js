import { SET_CURRENT_LOCATION } from "@/Redux/Slices/General";
import API from "../Constants/api";
import { store } from "@/Redux/Store";

export const getCategories = async () => {
    try {
        const res = await API.get("/categories");
        return res?.data;
    } catch (e) {
        console.error("Error getting categories:", e);
    }
};

export const getBrands = async () => {
    try {
        const res = await API.get("/brands");
        return res?.data;
    } catch (e) {
        console.error("Error getting brands:", e);
    }
};

export const getCities = async () => {
    try {
        const res = await API.get("/cities");
        return res?.data;
    } catch (e) {
        console.error("Error getting cities:", e);
    }
};

export const getMakeYears = async () => {
    try {
        const res = await API.get("/make-years"); // Replace endpoint if it's different
        return res?.data;
    } catch (e) {
        console.error("Error getting make years:", e);
    }
};

export const getAllCars = async ({ page, perPage }) => {
    try {
        const res = await API.get(`/cars?page=${page}&perPage=${perPage}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getCategorizedCars = async ({ category }) => {
    try {
        const res = await API.get(`/cars/category/${category}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getEconomyCars = async () => {
    try {
        const res = await API.get(`/cars/economy-cars`);
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getExoticCars = async () => {
    try {
        const res = await API.get(`/cars/exotic-cars`);
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getBrandsCars = async ({ brand }) => {
    try {
        const res = await API.get(`/cars/brand/${brand}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getViewedCars = async () => {
    try {
        const res = await API.get("/cars");
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getWishlistedCars = async () => {
    try {
        const res = await API.get("/cars");
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getSingleCar = async (carId) => {
    try {
        const res = await API.get(`/cars/${carId}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting single car:", e);
    }
};

export const setLocations = async (location) => {
    try {
        if (location) {
            // Use the user-provided location directly
            store.dispatch(SET_CURRENT_LOCATION(location));
            return;
        }

        // Get current coordinates using browser geolocation
        const getCurrentLocation = () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    return reject(new Error("Geolocation is not supported by your browser."));
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            });
        };

        const { latitude, longitude } = await getCurrentLocation();

        // Get city name from coordinates using reverse geocoding
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        const data = await response.json();
        const city = data.city || "Dubai";

        store.dispatch(SET_CURRENT_LOCATION(city));
    } catch (error) {
        console.error("Error fetching location:", error);
        store.dispatch(SET_CURRENT_LOCATION("Dubai")); // Final fallback
    }
};

export const generateLead = async (body) => {
    try {
        const res = await API.post("/leads/store", body);
        return res?.data;
    } catch (e) {
        console.error("Error generating lead:", e);
    }
}

export const getPremiumCars = async (id) => {
    try {
        const response = await API.get(`/cars/premium-category/cars/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}